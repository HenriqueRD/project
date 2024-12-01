import { FormEvent, useEffect, useState } from 'react'
import Header from '../../components/Header'
import style from './styles.module.css'
import CardItem from '../../components/CardItem'
import Button from '../../components/Button'
import { ArrowLeft, Check, Minus, Plus } from '@phosphor-icons/react'
import { ItemProps, ProductProps } from '../../types'
import Tag from '../../components/Tag'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../api'

export default function CreateOrder() {

  const nav = useNavigate()
  const [ productCurrent, setProductCurrent ] = useState<ProductProps>({} as any)
  const [ productNameCurrent, setProductNameCurrent ] = useState(productCurrent.name)
  const [ products, setProducts ] = useState<ProductProps[]>([])

  const [ itemsSelected, setItemsSelected ] = useState<ItemProps[]>([])
  const [ amount, setAmount ] = useState(0)
  const [ service, setService ] = useState("local")
  const [ client, setClient ] = useState("")
  const [ description, setDescription ] = useState("")

  async function getProducts() {
    await api.get("products").then(x => setProducts(x.data))
  }

  useEffect(() => {
    getProducts()
  }, [])

  async function handleCreateOrder(event : FormEvent) {
    event.preventDefault()
    if (itemsSelected.length === 0) {
      toast.error("Adicione um item para fazer o pedido!")
      return
    }    

    await api.post("orders", {
      client,
      service,
      items: itemsSelected.map(x => {
        return {
          amount: x.amount,
          description: x.description,
          product_id: x.product.id
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
            <div className={style.contentForm}>
              <div className={style.twoForms}>
                <form onSubmit={handleCreateOrder} className={style.formRequest}>
                  <div className={style.formRequestHeader}>
                    <div >
                      <h3>Novo Pedido</h3>
                      <Link to="/"><ArrowLeft size={18} /> Voltar aos pedidos</Link>
                    </div>
                    <Button title='Realizar Pedido' type="submit" text='Realizar Pedido' variant='success'/>
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
                        <option value="local">Local</option>
                        <option value="levar">Levar</option>
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
                    <div className={style.box}>
                      <label htmlFor="amount">Quantidade*</label>
                      <div className={style.addAmount}>
                        <Button onClick={handleRemoveAmount} type='button' icon variant='danger' ><Minus size={20} weight='bold' /></Button>
                        <input type="number" id='amount' value={amount} readOnly disabled />
                        <Button onClick={handleAddAmount} type='button' icon variant='success'><Plus size={20} weight='bold' /></Button>
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
                  <div className={style.containerListItems}>
                    {
                      itemsSelected.length === 0 ? (
                        <div className={style.empty}>
                          <span>Nem um item selecionado</span>
                        </div>
                      ) : (
                        <ul>
                          {
                            itemsSelected.map((x, i) => {
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
              <form onSubmit={handleSearchItem} className={style.formSearchItem}>
                <h3>Item</h3>
                <div className={style.headerTable}>
                  <div className={style.box}>
                    <label htmlFor="id">Procurar por id ou nome</label>
                    <div className={style.inputsSearch}>
                      <input  id='id' type="number" className={style.id} placeholder='id'/>
                      <input id='name' type="text"  placeholder='nome do produto'/>
                    </div>
                  </div>
                  <Button type='submit' text='Procurar'/>
                </div>
                <div className={style.containerTable}>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        products.map(x => {
                          return (
                            <tr key={x.id} title='Selecionar' onClick={() => { setProductCurrent(x); setAmount(1); setProductNameCurrent(x.name)}}>
                              <th scope="row">{x.id}</th>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}