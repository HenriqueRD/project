import { FormEvent, useEffect, useState } from 'react'
import Header from '../../components/Header'
import style from './styles.module.css'
import { api } from '../../api'
import { OrderProps, StatusOrderProps } from '../../types'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import CardItem from '../../components/CardItem'
import Tag from '../../components/Tag'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

export default function Order() {

  const [ order, setOrder ] = useState<OrderProps>({ id: 0, status_order: "em preparação", status_payment: "em aberto", client: "", service: "", createdAt: "", total: 0, items: [] });
  const { id } = useParams()
  const [ statusCurrent, setStatusCurrent ] = useState<StatusOrderProps>("null")

  async function getOrder(idOrder : string) {
    await api.get<OrderProps>(`orders/${idOrder}`).then(x => setOrder(x.data)).catch(() => alert("Erro"))
  }

  useEffect(() => {
    if (id) {
      getOrder(id)
    }
  }, [id])

  async function handleChangeStatus(event : FormEvent) {
    event.preventDefault()
    if (statusCurrent.trim() === "null") {
      toast.error("Escolha um status!")
      return
    }
    else if (statusCurrent.trim() === order.status_order) {
      toast.error("Escolha um status diferente do atual")
      return
    }
    api.put("orders", {
      id,
      status: statusCurrent
    }).then(() => {
      toast.success("Status atualizado")
      setStatusCurrent("null")
      if (id) {
        getOrder(id)
      }
    })
  }

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
                    <Link to="/"><ArrowLeft size={18} /> Voltar aos pedidos</Link>
                  </div>
                  <div className={style.orderInfoClientService}>
                    <div className={style.box}>
                      <label>Cliente</label>
                      <input type="text" value={order.client} readOnly/>
                    </div>
                    <div  className={style.box}>
                      <label>Serviço</label>
                      <input type="text" value={order.service} readOnly/>
                    </div>
                  </div>
                  <div className={style.orderStatus}>
                    <div className={style.status}>
                      <label>Status atual</label>
                      <input type="text" value={order.status_order} readOnly/>
                    </div>
                    <form onSubmit={handleChangeStatus}>
                      <div className={style.buttons}>
                        <button type='button' onClick={() => setStatusCurrent("em preparação")} className={statusCurrent === "em preparação" ? style.isActive : style.x}>
                          <Tag text="em preparação" />
                        </button>
                        <button type='button' onClick={() => setStatusCurrent("finalizado")} className={statusCurrent === "finalizado" ? style.isActive : style.x}>
                          <Tag text="finalizado" />
                        </button>
                        <button type='button' onClick={() => setStatusCurrent("cancelado")} className={statusCurrent === "cancelado" ? style.isActive : style.x}>
                          <Tag text="cancelado" />
                        </button>
                      </div>
                      <Button type='submit' text='Atualizar' />
                    </form>
                  </div>
                </div>
                <div className={style.actionOrder}>
                  <Button title='Editar informação do pedido' type='submit' variant='alert' text='Editar pedido' />
                  <Button title='Ir para o pagamento' type='submit' variant='success' text='Concluir pedido' />
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