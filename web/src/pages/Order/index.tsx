import { FormEvent, useEffect, useState } from 'react'
import Header from '../../components/Header'
import style from './styles.module.css'
import { api } from '../../api'
import { OrderProps } from '../../types'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import CardItem from '../../components/CardItem'
import Tag from '../../components/Tag'
import Button from '../../components/Button'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { TailSpin } from 'react-loader-spinner'

export default function Order() {

  const [ order, setOrder ] = useState<OrderProps>({ client: "", createdAt: new Date(), items: [], sell: [], service: "", statusOrder: "EM_PREPARACAO", statusPayment: "EM_ABERTO", totalValue: 0, updatedAt: new Date(), id: 0 });
  const { id } = useParams()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isLoadingOrder, setIsLoadingOrder ] = useState(false)
  const nav = useNavigate()
  const [ statusCurrent, setStatusCurrent ] = useState("null" as String | "EM_PREPARACAO" | "CONCLUIDO")

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
    if (statusCurrent === "null") {
      toast.error("Escolha um status")    
      setIsLoading(false)
      return  
    }
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
      <main id={style.order}>
        <div className="container">
          <div className="content">
          {
            isLoadingOrder ? (
              <div className='contentEmpty'>
                <TailSpin
                  visible={true}
                  height="66"
                  width="66"
                  color="#0a58ca"
                  ariaLabel="tail-spin-loading"
                />
              </div>
              ) : (
                <div className={style.content}>
                  <div className={style.order}>
                    <div className={style.contentOrder}>
                      <div className={style.headerInfo}>
                        <div>
                          <h3>Informação do pedido #{order.id}</h3>
                          <Tag text={order.statusPayment} />
                        </div>
                        <div>
                          <Link to="/pedidos"><ArrowLeft size={18} /> Voltar aos pedidos</Link>
                          <div className={style.dates}>
                            <span>Criado em {format(order.createdAt, 'dd/MM/yyyy HH:mm')}</span>
                            <span>Atualizado em {format(order.updatedAt, 'dd/MM/yyyy  HH:mm')}</span>
                          </div>
                        </div>
                      </div>
                      <div className={style.orderInfoClientService}>
                        <div className={style.box}>
                          <label>Cliente</label>
                          <input type="text" value={order.client} readOnly/>
                        </div>
                        <div  className={style.box}>
                          <label>Serviço</label>
                          <Tag text={order.service} />
                        </div>
                      </div>
                      <div className={style.orderStatus}>
                        <div className={style.status}>
                          <label>Status atual</label>
                          <Tag text={order.statusOrder} />
                        </div>
                        {
                          order.statusOrder !== "FINALIZADO" && (
                            <form onSubmit={handleChangeStatus}>
                              <div className={style.buttons}>
                                <button type='button' onClick={() => setStatusCurrent("EM_PREPARACAO")} className={statusCurrent === "EM_PREPARACAO" ? style.isActive : style.x}>
                                  <Tag text="EM_PREPARACAO" />
                                </button>
                                <button type='button' onClick={() => setStatusCurrent("CONCLUIDO")} className={statusCurrent === "CONCLUIDO" ? style.isActive : style.x}>
                                  <Tag text="CONCLUIDO" />
                                </button>
                              </div>
                              <Button disabled={isLoading} type='submit' text='Atualizar' />
                            </form>
                          )
                        }
                      </div>
                      {
                        order.statusPayment === "PAGO" && order.sell.map(x => {
                          return (
                            <div className={style.totalOrder}>
                              <h3>Resumo do Pagamento</h3>
                              <div>
                                <div className={style.box}>
                                  <span>Subtotal dos itens</span>
                                  <span className={style.value}>+ {order.totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                </div>
                                <div className={style.box}>
                                  <span>Desconto</span>
                                  <span className={style.value}>- {x.discount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                </div>
                                <div className={style.box}>
                                  <span>Forma de Pagamento</span>
                                  <span className={`${style.methodPay} ${style.value}`}>{x.methodPayment}</span>
                                </div>
                                <div className={style.totalValue}>
                                  <span className={style.value}>Total Final</span>
                                  <span className={style.value}>{(x.totalValue - x.discount).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                </div>
                              </div>
                            </div> 
                          )
                        })
                      }
                      
                    </div>
                    <div className={style.actionOrder}>
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
                  <div className={style.listItems}>
                    <div className={style.listItemsHeader}>
                      <div>
                        <h3>Itens</h3>
                        <Tag text={order.items.length.toString()} type='normal' />
                      </div>
                    </div>
                    <div className={style.containerListItems}>
                      {
                        order.items?.length === 0 ? (
                          <div className={style.empty}>
                            <span>Nem um item no pedido</span>
                          </div>
                        ) : (
                          <ul>
                            {
                              order.items?.map((x, i) => {
                                return (
                                  <li key={i}>
                                    <CardItem data={x} id={i+1} readOnly/>
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
              )
            }
          </div>
        </div>
      </main>
    </>
  )
}