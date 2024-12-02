import { FormEvent, useEffect, useState } from 'react'
import Header from '../../components/Header'
import style from './styles.module.css'
import { api } from '../../api'
import { OrderProps, StatusOrderProps } from '../../types'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import CardItem from '../../components/CardItem'
import Tag from '../../components/Tag'
import Button from '../../components/Button'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export default function Order() {

  const [ order, setOrder ] = useState<OrderProps>({} as any);
  const { id } = useParams()
  const [ isLoading, setIsLoading ] = useState(false)
  const nav = useNavigate()
  const [ statusCurrent, setStatusCurrent ] = useState<StatusOrderProps>(order.status_order)

  async function getOrder(idOrder : string) {
    await api.get<OrderProps>(`orders/${idOrder}`).then(x => { setOrder(x.data); setStatusCurrent(x.data.status_order)}).catch(() => alert("Erro"))
  }

  useEffect(() => {
    if (id) {
      getOrder(id)
    }
  }, [id])

  async function handleChangeStatus(event : FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    if (statusCurrent.trim() === "null") {
      toast.error("Escolha um status!")
      setIsLoading(false)
      return
    }
    else if (statusCurrent.trim() === order.status_order) {
      toast.error("Escolha um status diferente do atual")    
      setIsLoading(false)
      return  
    }
    api.put("orders", {
      id: order.id,
      status_order: statusCurrent
    }).then(() => {
      toast.success("Status atualizado")
      if (id) {
        getOrder(id)
      }
      setIsLoading(false)
    }).catch(() => {
      toast.success("Falha ao atualizar o status")
      setIsLoading(false)
    })
  }

  async function handleFinishOrder() {
    setIsLoading(true)
    api.put("orders", {
      id: order.id,
      status_order: "FINALIZADO"
    }).then(() => {
      toast.success("Pedido finalizado")
      setIsLoading(false)
      nav("/")
    }).catch(() => {
      toast.error("Falha ao finalizar pedido")
      setIsLoading(false)
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

  if (!order.created_at) return <h1>oi</h1>
  if (!order.update_at) return <h1>oi</h1>

  return (
    <>
      <Header />
      <main id={style.order}>
        <div className="container">
          <div className="content">
            <div className={style.content}>
              <div className={style.order}>
                <div className={style.contentOrder}>
                  <div className={style.headerInfo}>
                    <div>
                      <h3>Informação do pedido #{order.id}</h3>
                      <Tag text={order.status_payment} />
                    </div>
                    <div>
                      <Link to="/"><ArrowLeft size={18} /> Voltar aos pedidos</Link>
                      <div className={style.dates}>
                        <span>Criado em {format(new Date(order.created_at), 'dd/MM/yyyy HH:mm')}</span>
                        <span>Atualizado em {format(new Date(order.update_at), 'dd/MM/yyyy  HH:mm')}</span>
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
                      <Tag text={order.status_order} />
                    </div>
                    {
                        order.status_order !== "FINALIZADO" && (
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
                </div>
                <div className={style.actionOrder}>
                  {
                    order.status_payment === "EM_ABERTO" ? (
                      <>
                        <Button disabled={isLoading} onClick={handleDeleteOrder} title='Remover pedido' type='button' text='Excluir Pedido' variant='danger' />                      
                        <Link to={`/`}>
                          <Button disabled={isLoading} title='Editar informação do pedido' type='button' variant='alert' text='Editar pedido' />
                        </Link>
                        <Link to={`/pedido/pagamento/${order.id}`}>
                          <Button disabled={isLoading} title='Ir para o pagamento' type='button' text='Cobrar Pedido' variant='success' />                      
                        </Link>
                      </>
                    ) : (
                      order.status_payment === "PAGO" && order.status_order !== "FINALIZADO" && (
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
                    order.items.length === 0 ? (
                      <div className={style.empty}>
                        <span>Nem um item no pedido</span>
                      </div>
                    ) : (
                      <ul>
                        {
                          order.items.map((x, i) => {
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
          </div>
        </div>
      </main>
    </>
  )
}