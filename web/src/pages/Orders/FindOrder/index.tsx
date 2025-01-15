import { FormEvent, useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { api } from '../../../api'
import { OrderProps, StatusOrderProps } from '../../../types'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CardItem from '../../../components/CardItem'
import Tag from '../../../components/Tag'
import Button from '../../../components/Button'
import toast from 'react-hot-toast'
import { TailSpin } from 'react-loader-spinner'
import RecordCreateUpdate from '../../../components/RecordCreateUpdate'
import LinkGotoBack from '../../../components/LinkGotoBack'
import TableEmptyMessage from '../../../components/TableEmptyMessage'

export default function Order() {

  const [ order, setOrder ] = useState<OrderProps>({ client: "", createdAt: new Date(), items: [], sell: [], service: "", statusOrder: "EM_PREPARACAO", statusPayment: "EM_ABERTO", totalValue: 0, updatedAt: new Date(), id: 0 });
  const { id } = useParams()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isLoadingOrder, setIsLoadingOrder ] = useState(false)
  const nav = useNavigate()
  const [ statusCurrent, setStatusCurrent ] = useState<StatusOrderProps>("CONCLUIDO")

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

  async function handleChangeStatus(event : FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    if (statusCurrent.trim() === order.statusOrder) {
      toast.error("Escolha um status diferente do atual")    
      setIsLoading(false)
      return  
    }
    api.patch(`orders/${id}`, {
      orderStatus: statusCurrent
    }).then(() => {
      toast.success("Status atualizado")
    }).catch((x) => {
      toast.error("Falha ao atualizar o status")
      console.error(x.response.data.message)
    }).finally(() => {
      setIsLoading(false)
      if (id) {
        getOrder(id)
      }
    })
  }

  async function handleFinishOrder() {
    setIsLoading(true)
    api.patch(`orders/${id}/finished`).then(() => {
      toast.success("Pedido finalizado")
    }).catch((x) => {
      toast.error("Falha ao finalizar pedido")
      console.error(x.response.data.message)
    }).finally(() => {
      setIsLoading(false)
      if (id) {
        getOrder(id)
      }
    })
  }

  async function handleDeleteOrder() {
    setIsLoading(true)
    api.delete(`orders/${order.id}`).then(() => {
      toast.success("Pedido excluido")
      setIsLoading(false)
      nav("/")
    }).catch(() => {
      toast.error("Falha ao excluir pedido")
      setIsLoading(false)
    })
  }

  return (
    <>
      <Header />
      <main className='mt-16 lg:mt-8'>
        <div className="container">
          <div className="bg-neutral-50 p-6 rounded border border-slate-300 md:p-4">
          {
            isLoadingOrder ? (
              <div className='h-[30rem] flex items-center justify-center'>
                <TailSpin
                  visible={true}
                  height="66"
                  width="66"
                  color="#0a58ca"
                  ariaLabel="tail-spin-loading"
                />
              </div>
              ) : (
                <div className="flex flex-col gap-16 lg:gap-8">
                  <div className="flex gap-8 lg:flex-col">
                    <div className="flex flex-col gap-4 w-3/5 lg:w-full">
                      <div className="flex justify-between items-start border-b border-slate-300 pb-4">
                        <div className="flex flex-col gap-4 items-start">
                          <h3 className="text-lg">Detalhes do pedido #{order.id}</h3>
                          <LinkGotoBack to="/pedidos" text='Voltar aos pedidos' />
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Tag text={order.statusPayment} />
                          <RecordCreateUpdate createdAt={order.createdAt} updatedAt={order.updatedAt} />
                        </div>
                      </div>
                      <div className="flex gap-8 w-full border-b border-slate-300 pb-4 sm:gap-4">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <label>Cliente</label>
                          <input className="w-full" type="text" value={order.client} readOnly/>
                        </div>
                        <div className="flex flex-col gap-2 items-start w-full">
                          <label>Serviço</label>
                          <input className="w-full" type="text" value={order.service} readOnly/>
                        </div>
                      </div>
                      <div className="flex gap-8 w-full border-b border-slate-300 pb-4 sm:gap-4">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <label>Status atual</label>
                          <Tag text={order.statusOrder}/>
                        </div>
                        {
                          order.statusOrder !== "FINALIZADO" && (
                            <form onSubmit={handleChangeStatus} className='flex gap-2 w-full items-center justify-between'>
                              <div className="flex flex-col gap-2">
                                <label>Atualizar status</label>
                                <select className='px-2' value={statusCurrent} onChange={x => setStatusCurrent(x.target.value as StatusOrderProps)}>
                                  <option value="CONCLUIDO">Concluído</option>
                                  <option value="EM_PREPARACAO">Em preparação</option>
                                </select>
                              </div>
                              <Button disabled={isLoading} type='submit' text='Mudar' title='Mudar status'/>
                            </form>
                          )
                        }
                      </div>
                      {
                        order.statusPayment === "PAGO" && order.sell.map(x => {
                          return (
                            <div className="flex flex-col gap-4">
                              <h3 className='text-lg'>Resumo da venda</h3>
                              <div className="flex flex-col p-4 gap-2 rounded border border-slate-300 bg-white">
                                <div className="flex items-center justify-between border-dashed border-b border-slate-300">
                                  <span>Subtotal dos itens</span>
                                  <span className="font-medium">+ {order.totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                </div>
                                <div className="flex items-center justify-between border-dashed border-b border-slate-300">
                                  <span>Desconto</span>
                                  <span className="font-medium">- {x.discount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                </div>
                                <div className="flex items-center justify-between border-dashed border-b border-slate-300">
                                  <span>Forma de Pagamento</span>
                                  <span className="font-medium text-sm">{x.methodPayment}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Total Final</span>
                                  <span className="font-medium">{(x.totalValue - x.discount).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                </div>
                              </div>
                            </div> 
                          )
                        })
                      }  
                    </div>
                    <div className="flex flex-col gap-4 w-2/5 lg:w-full">
                      <div className="flex items-center justify-between">
                        <div className='flex gap-4 items-center'>
                          <h3 className='text-lg'>Itens</h3>
                          <Tag text={order.items.length.toString()} type='normal' />
                        </div>
                      </div>
                      <div className="bg-white rounded border border-slate-200 w-full h-80 sm:h-56 overflow-auto p-2">
                        {
                          order.items?.length === 0 ? (
                            <TableEmptyMessage text='nem um item no pedido' />
                          ) : (
                            <ul className='flex gap-2 flex-col'>
                              {
                                order.items?.map((x, i) => {
                                  return (
                                    <li key={i}>
                                      <CardItem data={x} index={i+1} readOnly/>
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
                  <div className="flex items-center justify-center gap-6 sm:gap-4">
                    {
                      order.statusPayment === "EM_ABERTO" ? (
                        <>
                          <Button disabled={isLoading} onClick={handleDeleteOrder} title='Remover pedido' type='button' text='Excluir Pedido' variant='danger' />                      
                          <Link to={`/pedido/editar/${order.id}`}>
                            <Button disabled={isLoading} title='Editar informação do pedido' type='button' variant='alert' text='Editar pedido' />
                          </Link>
                          <Link to={`/pedido/pagar/${order.id}`}>
                            <Button disabled={isLoading} title='Ir para o pagamento' type='button' text='Cobrar Pedido' variant='success' />                      
                          </Link>
                        </>
                      ) : (
                        order.statusPayment === "PAGO" && order.statusOrder !== "FINALIZADO" && (
                          <Button disabled={isLoading} onClick={handleFinishOrder} title="Finalizar pedido" type='button' variant='success' text='Finalizar Pedido' />
                        )
                      )
                    }
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </main>
    </>
  )
}