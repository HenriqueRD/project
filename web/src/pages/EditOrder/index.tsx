import { FormEvent, useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import style from './styles.module.css'
import CardItem from '../../components/CardItem'
import Button from '../../components/Button'
import { ArrowLeft, Check, Minus, Plus } from '@phosphor-icons/react'
import { ItemProps, OrderProps, ProductProps } from '../../types'
import Tag from '../../components/Tag'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../api'
import { ProductContext } from '../../contexts/ProductContext'
import { TailSpin } from 'react-loader-spinner'

export default function EditOrder() {

  const [ order, setOrder ] = useState<OrderProps>({ client: "", created_at: new Date(), items: [], sell: [], service: "", status_order: "EM_PREPARACAO", status_payment: "EM_ABERTO", total_value: 0, updated_at: new Date(), id: 0 });
  const { id } = useParams()
  const nav = useNavigate()
  const [ productCurrent, setProductCurrent ] = useState<ProductProps>({} as any)
  const [ productNameCurrent, setProductNameCurrent ] = useState(productCurrent.name)
  const { products } = useContext(ProductContext)
  const [ productsListCurrent, setProductsListCurrent ] = useState<ProductProps[]>(products)
  const [ isLoadingOrder, setIsLoadingOrder ] = useState(false)

  const [ itemsSelected, setItemsSelected ] = useState<ItemProps[]>([])
  const [ amount, setAmount ] = useState(0)
  const [ service, setService ] = useState("LOCAL")
  const [ client, setClient ] = useState("")
  const [ description, setDescription ] = useState("")

  async function getOrder(idOrder : string) {
    setIsLoadingOrder(true)
    await api.get<OrderProps>(`orders/${idOrder}`).then(x => { 
      setOrder(x.data)
    }).catch((err) => {
      toast.error(err.message)
      nav("/")
    }).finally(() => {
      setIsLoadingOrder(false)
    });
  }

  useEffect(() => {
    if (id) {
      getOrder(id)
    }
  }, [id])

  function handleSearchProducts(text : String) {
    const newArray = products.filter(x => x.name.toLowerCase().includes(text.toLowerCase()))
    setProductsListCurrent(newArray);
  }

  function handleFormSearchProductReset() {
    setProductsListCurrent(products)
  }

  async function handleCreateOrder(event : FormEvent) {
    event.preventDefault()
    if (itemsSelected.length === 0) {
      toast.error("Adicione um item para fazer o pedido!")
      return
    }    

    await api.post("orders/", {
      client,
      service,
      items: itemsSelected.map(x => {
        return {
          amount: x.amount,
          description: x.description,
          product: {
            id: x.product.id
          }
        }
      })
    }).then(() => {
      toast.success("Pedido criado!")
      nav("/")
    })
  }

  function handleSearchItem(event : FormEvent) {
    event.preventDefault()
  }

  function handleAddItem(event : FormEvent) {
    event.preventDefault()
    if (!productCurrent.name || amount === 0) {
      toast.error("Selecione um Item!")
      return
    }  
    setItemsSelected([...itemsSelected, {
      amount,
      description,
      product: productCurrent
    }])
    toast.success("Item adicionado!")
    setProductNameCurrent("")
    setAmount(0)
    setDescription("")
    setProductCurrent({} as any)
  }

  function handleRemoveItem(id : number) {
    const newArray = itemsSelected.filter((__, i) => i !== id)
    setItemsSelected(newArray)
  }

  function handleAddAmount() {
    if(amount < 0) { setAmount(0); return }
    setAmount(amount + 1)
  }

  function handleRemoveAmount() {
    if(amount <= 0) { setAmount(0); return }
    setAmount(amount - 1)
  }

  return (
    <>
      <Header />
      <main id={style.createOrder}>
        <div className="container">
          <div className="content">
            {
              isLoadingOrder ? (
                <div className='contentEmpty'>
                  <TailSpin
                    visible={true}
                    height="66"
                    width=""
                    color="#0a58ca"
                    ariaLabel="tail-spin-loading"
                  />
                </div>
              ) : (
                <div className={style.contentForm}>
                  <div className={style.twoForms}>
                    <form onSubmit={handleCreateOrder} className={style.formRequest}>
                      <div className={style.formRequestHeader}>
                        <div >
                          <h3>Editar pedido #{order.id}</h3>
                          <Link to={`/pedido/${order.id}`}><ArrowLeft size={18} /> Voltar ao pedido</Link>
                        </div>
                        <Button title='Editar pedido' type="submit" text='Atualizar pedido' variant='alert'/>
                      </div>
                      <div className={style.twoInput}>
                        <div className={style.box}>
                          <label htmlFor="client">Cliente</label>
                          <input id='client' type="text" placeholder='nome do cliente' value={client} onChange={x => setClient(x.target.value)}/>
                        </div>
                        <div className={style.box}>
                          <label htmlFor="service">Serviço*</label>
                          <select id='service' value={service} onChange={x => setService(x.target.value)}>
                            <option value="">Escolha o tipo</option>
                            <option value="LOCAL">Local</option>
                            <option value="LEVAR">Levar</option>
                          </select>
                        </div>
                      </div>
                    </form>
                    <form onSubmit={handleAddItem} className={style.formItem}>
                      <div className={style.formItemHeader}>
                        <h3>Item selecionado</h3>
                        <Button type='submit' text='Adicionar Item' />
                      </div>
                      <div className={style.twoInput}>
                        <div className={style.box}>
                          <label htmlFor="">Nome do Produto</label>
                          <input type="text" placeholder='Escolher Produto' value={productNameCurrent} readOnly disabled/>
                        </div>
                        <div className={style.mobInput}>
                          <div className={style.box}>
                            <label htmlFor="amount">Quantidade*</label>
                            <div className={style.addAmount}>
                              <Button onClick={handleRemoveAmount} type='button' icon variant='danger' ><Minus size={20} weight='bold' /></Button>
                              <input type="number" id='amount' value={amount} readOnly disabled />
                              <Button onClick={handleAddAmount} type='button' icon variant='success'><Plus size={20} weight='bold' /></Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={style.twoInput}>
                        <div className={style.box}>
                          <label className={style.desc} htmlFor="desc">Descrição</label>
                          <input type="text" id="desc" placeholder='Observações sobre o produto' value={description} onChange={x => setDescription(x.target.value)} />
                        </div>
                      </div>
                    </form>
                    <div className={style.listItems}>
                      <div className={style.listItemsHeader}>
                        <h3>Itens</h3>
                        <Tag type="normal" text={itemsSelected.length.toString()} />
                      </div>
                      <div className={style.contentItems}>
                        <div className={style.containerListItems}>
                          {
                            order.items.length === 0 ? (
                              <div className={style.empty}>
                                <span>Nem um item selecionado</span>
                              </div>
                            ) : (
                              <ul>
                                {
                                  order.items.map((x, i) => {
                                    return (
                                      <li key={i}>
                                        <CardItem data={x} id={i+1} handleOnClick={() => handleRemoveItem(i)}/>
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSearchItem} className={style.formSearchItem}>
                    <h3>Produtos</h3>
                    <div className={style.headerTable}>
                      <div className={style.box}>
                        <label htmlFor="id">Procurar por nome</label>
                        <div className={style.inputsSearch}>
                          <input id='name' placeholder='nome do produto' onChange={(x) => handleSearchProducts(x.target.value)} />
                        </div>
                      </div>
                      <Button type='reset' text='Resetar' onClick={handleFormSearchProductReset}/>
                    </div>
                    <div className={style.containerTable}>
                      {
                        productsListCurrent.length === 0 ? (
                          <div className={style.empty}>
                            <span>Nem um produto foi encontrado</span>
                          </div>
                        ) : (
                          <table className='table'>
                            <thead>
                              <tr>
                                <th scope="col" className='thId'>#</th>
                                <th scope="col">Produto</th>
                                <th scope="col">Preço</th>
                                <th scope="col" className='thButtons'>Ação</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                productsListCurrent.map(x => {
                                  return (
                                    <tr key={x.id} title='Selecionar' onClick={() => { setProductCurrent(x); setAmount(1); setProductNameCurrent(x.name)}}>
                                      <th scope="row" className='thId'>{x.id}</th>
                                      <td>{x.name}</td>
                                      <td>{x.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                      <td className="buttons">
                                        <Button icon type='button' title='Selecionar' variant='success'><Check weight='bold' size={20} /></Button>
                                      </td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                        )
                      }
                    </div>
                  </form>
                </div>
              )
            }
          </div>
        </div>
      </main>
    </>
  )
}