import { FormEvent, useContext, useEffect, useState } from 'react'
import Header from '../../../components/Header'
import CardItem from '../../../components/CardItem'
import Button from '../../../components/Button'
import { Check, Minus, Plus } from '@phosphor-icons/react'
import { ItemProps, OrderProps, ProductProps } from '../../../types'
import Tag from '../../../components/Tag'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../api'
import { ProductContext } from '../../../contexts/ProductContext'
import { TailSpin } from 'react-loader-spinner'
import TableEmptyMessage from '../../../components/TableEmptyMessage'
import LinkGotoBack from '../../../components/LinkGotoBack'
import RecordCreateUpdate from '../../../components/RecordCreateUpdate'

export default function EditOrder() {

  const [ order, setOrder ] = useState<OrderProps>({ id: 0, client: "", createdAt: new Date(), items: [], sell: [], service: "LOCAL", statusOrder: "EM_PREPARACAO", statusPayment: "EM_ABERTO", totalValue: 0, updatedAt: new Date() });
  const { id } = useParams()
  const nav = useNavigate()
  const [ productCurrent, setProductCurrent ] = useState<ProductProps>({} as any)
  const [ productNameCurrent, setProductNameCurrent ] = useState(productCurrent.name)
  const { products } = useContext(ProductContext)
  const [ productsListCurrent, setProductsListCurrent ] = useState<ProductProps[]>(products)
  const [ isLoadingOrder, setIsLoadingOrder ] = useState(true)
  const [ isLoadingItem, setIsLoadingItem ] = useState(false)
  const [ itemsSelected, setItemsSelected ] = useState<ItemProps[]>([])

  const [ amount, setAmount ] = useState(0)
  const [ service, setService ] = useState("")
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

  useEffect(() => {
    if (order.items) {
      setItemsSelected(order.items)
      setService(order.service)
      setClient(order.client)
    }
  }, [order])

  function handleSearchProducts(text : String) {
    const newArray = products.filter(x => x.name.toLowerCase().includes(text.toLowerCase()))
    setProductsListCurrent(newArray);
  }

  function handleFormSearchProductReset() {
    setProductsListCurrent(products)
  }

  async function handleUpdateInfoOrder(event : FormEvent) {
    event.preventDefault()
    await api.put(`orders/${order.id}`, {
      client,
      service
    }).then(() => {
      toast.success("Pedido criado")
      nav("/pedidos")
    }).catch((x) => {
      toast.error("Falha ao atualizar o pedido")
      console.error(x.response.data.message)
    })
  }
  
  async function handleAddItem(event : FormEvent) {
    event.preventDefault()
    setIsLoadingItem(true)
    if (!productCurrent.name || amount === 0) {
      toast.error("Selecione um Item!")
      return
    }
    await api.post(`items/order/${order.id}`, {
      amount,
      description,
      product: {
        id: productCurrent.id
      }
    }).then(({data}) => {
      setItemsSelected([...itemsSelected, {
        id: data.id,
        amount,
        description,
        product: productCurrent
      }])
      toast.success("Item adicionado")
    }).catch((x) => {
      toast.error("Falha ao adicionar o item")
      console.error(x.response.data.message)
    }).finally(() => {
      setProductNameCurrent("")
      setAmount(0)
      setDescription("")
      setProductCurrent({} as any)
      setIsLoadingItem(false)
    })
  }

  async function handleRemoveItem(id?: number) {
    setIsLoadingItem(true)
    await api.delete(`items/${id}/order/${order.id}`).then(() => {
      toast.success("Item removido")
      const newArray = itemsSelected.filter((x) => x.id !== id)
      setItemsSelected(newArray)
    }).catch(x => {
      toast.error("Falha ao remover o item")
      console.error(x.response.data.message)
    }).finally(() => {
      setIsLoadingItem(false)
    })
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
      <main className='mt-8'>
        <div className="container">
          <div className="bg-neutral-50 p-6 rounded border border-slate-300 md:p-4">
            {
              isLoadingOrder ? (
                <div className='w-full h-[35rem] flex items-center justify-center'>
                  <TailSpin
                    visible={true}
                    height="66"
                    width="66"
                    color="#0a58ca"
                    ariaLabel="tail-spin-loading"
                  />
                </div>
              ) : (
                <div className="flex gap-8 lg:flex-col">
                  <div className="flex flex-col w-3/5 gap-4 lg:w-full">
                    <form onSubmit={handleUpdateInfoOrder} className="flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-4">
                          <h3 className="text-lg">Editar pedido #{order.id}</h3>
                          <LinkGotoBack to={`/pedido/${order.id}`} text='Voltar ao pedido'/>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Button title='Realizar Pedido' type="submit" text='Atualizar Pedido' variant='alert'/>                          
                          <RecordCreateUpdate createdAt={order.createdAt} updatedAt={order.updatedAt} />
                        </div>
                      </div>
                      <div className="flex gap-8 border-b border-slate-300 pb-4">
                        <div className="flex flex-col gap-2 w-full">
                          <label htmlFor="client">Cliente</label>
                          <input className='w-full' id='client' type="text" placeholder='nome do cliente' value={client} onChange={x => setClient(x.target.value)}/>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <label htmlFor="service">Serviço*</label>
                          <select id='service' className='w-full' value={service} onChange={x => setService(x.target.value)}>
                            <option value="LOCAL">Local</option>
                            <option value="LEVAR">Levar</option>
                          </select>
                        </div>
                      </div>
                    </form>
                    <form onSubmit={handleAddItem} className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h3 className='text-lg'>Item selecionado</h3>
                        <Button type='submit' text='Adicionar Item' />
                      </div>
                      <div className="flex items-center gap-8 w-full">
                        <div className="flex flex-col gap-2 w-full">
                          <label>Produto*</label>
                          <input className='w-full' type="text" placeholder='Escolher Produto' value={productNameCurrent} readOnly disabled/>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <label htmlFor="amount">Quantidade*</label>
                          <div className="flex items-center gap-2">
                            <Button onClick={handleRemoveAmount} type='button' icon variant='danger' ><Minus size={20} weight='bold' /></Button>
                            <input className="w-10 p-3 text-center" type="number" id='amount' value={amount} readOnly disabled />
                            <Button onClick={handleAddAmount} type='button' icon variant='success'><Plus size={20} weight='bold' /></Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="desc">Descrição</label>
                        <input type="text" id="desc" placeholder='observações sobre o produto' value={description} onChange={x => setDescription(x.target.value)} />
                      </div>
                    </form>
                    <div className="flex flex-col gap-2 border-t pt-4 border-slate-300">
                      <div className="flex gap-4 items-center">
                        <h3 className='text-lg'>Itens</h3>
                        <Tag type="normal" text={itemsSelected.length.toString()} />
                      </div>
                      <div className="bg-white p-4 rounded border border-slate-200 w-full h-80 overflow-auto">
                        {
                          isLoadingItem ? (
                            <div className='w-full h-full flex items-center justify-center'>
                              <TailSpin
                                visible={true}
                                height="66"
                                width="66"
                                color="#0a58ca"
                                ariaLabel="tail-spin-loading"
                              />
                            </div>
                          ) : (
                            itemsSelected.length === 0 ? (
                              <TableEmptyMessage text='nem um item selecionado' />
                            ) : (
                              <ul className='flex flex-col gap-2'>
                                {
                                  itemsSelected.map((x, i) => {
                                    return (
                                      <li key={i}>
                                        <CardItem data={x} index={i + 1} handleOnClick={() => handleRemoveItem(x.id)}/>
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            )
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <form className="w-2/5 flex flex-col gap-4 lg:w-full">
                    <div className='flex flex-col gap-4'>
                      <h3 className='text-lg'>Produtos</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="id">Procurar por nome</label>
                          <input id='name' placeholder='nome do produto' onChange={(x) => handleSearchProducts(x.target.value)} />
                        </div>
                        <Button type='reset' text='Resetar' onClick={handleFormSearchProductReset}/>
                      </div>
                    </div>
                    <div className="bg-white rounded border border-slate-200 w-full h-[26rem] overflow-auto">
                      {
                        productsListCurrent.length === 0 ? (
                          <TableEmptyMessage text='nem um produto encontrado' />
                        ) : (
                          <table className='table table-fixed w-full'>
                            <thead>
                              <tr>
                                <th scope="col">Produto</th>
                                <th scope="col">Preço</th>
                                <th scope="col" className='w-16'>Ação</th>
                              </tr>
                            </thead>
                              <tbody>
                                {
                                  productsListCurrent.map(x => {
                                    return (
                                      <tr key={x.id} title='Selecionar' onClick={() => { setProductCurrent(x); setAmount(1); setProductNameCurrent(x.name)}}>
                                        <td>{x.name}</td>
                                        <td>{x.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                        <td className="flex items-center justify-center">
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