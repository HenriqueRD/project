import { Check, ClipboardText, NotePencil } from '@phosphor-icons/react'
import { format, formatDistance, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Header from '../../components/Header'
import style from './styles.module.css'
import Tag from '../../components/Tag'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { OrderProps, StatusOrderProps } from '../../types'
import { FormEvent, useEffect, useState } from 'react'
import { api } from '../../api'

export default function OrdersList() {

  const nav = useNavigate()
  const [ orders, setOrders ] = useState<OrderProps[]>([])
  const [ date, setDate ] = useState(new Date())
  const [ status, setStatus ] = useState<StatusOrderProps>("EM_PREPARACAO")

  async function getOrders() { 
    await api.get("orders", { params: {
      date: format(date, 'yyyy-MM-dd'),
      status: ["EM_PREPARACAO", "CONCLUIDO"]
    }}).then(x => setOrders(x.data))
  }

  useEffect(() => {    
    getOrders()
  }, [])

  async function handleSearchOrders(event : FormEvent) {
    event.preventDefault()
    await api.get("orders", { params: {
      date: format(date, 'yyyy-MM-dd'),
      status
    } }).then(x => setOrders(x.data))
  }

  function handleClickOrder(id : number) {
    nav(`/pedido/${id}`)
  }
  
  return (
    <>
      <Header />
      <main id={style.orders}>
        <div className="container">
          <div className='content'>
            <div className={style.orders}>
              <div className={style.headerTable}>
                <div className={style.orderLengthSearch}>
                  <div className={style.orderLength}>
                    <h3>Pedidos </h3>
                    <Tag text={orders.length.toString()} type='normal' />
                  </div>
                  <Button onClick={() => nav("/novo-pedido")} text="Novo Pedido" title='Realizar Pedido' />
                </div>
                <div className={style.search}>
                  <p>Filtrar pedidos por Data e Categoria</p>
                  <div className={style.form}>
                    <form onSubmit={handleSearchOrders}>
                      <div className={style.inputs}>
                        <select value={status} onChange={x => setStatus(x.target.value as StatusOrderProps)}>
                          <option value="EM_PREPARACAO">Em preparação</option>
                          <option value="CONCLUIDO">Concluído</option>
                          <option value="FINALIZADO">Finalizado</option>
                        </select>
                        <input type="date" value={format(date, 'yyyy-MM-dd')} onChange={x => setDate(new Date(x.target.value))}/>
                        <Button type='submit' text='Procurar' />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className={style.containerTable}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Cliente</th>
                      <th scope="col">Itens</th>
                      <th scope="col">Criado</th>
                      <th scope="col">Serviço</th>
                      <th scope="col">Valor total</th>
                      <th scope="col">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.map(x => {
                        return (
                          <tr key={x.id} onClick={() => handleClickOrder(x.id)}>
                            <th scope="row">{x.id}</th>
                            <td><Tag text={x.status_order}/></td>
                            <td>{x.client}</td>
                            <td>{x.items.length}</td>
                            <td><time title={format(x.created_at, 'dd/MM/yyyy')} dateTime={x.created_at.toString()}>{formatDistance(subDays(x.created_at, 0), new Date(), {addSuffix: false, locale: ptBR})}</time></td>
                            <td><Tag text={x.service}/></td>
                            <td className={style.total}><Tag text={x.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} type={x.status_payment === "PAGO" ? "success" : "alert"} /></td>
                            <td className="buttons">
                              <Button icon title='Visualizar Pedido'><ClipboardText size={22} /></Button>
                              <Button icon title='Editar Pedido' variant='alert'><NotePencil size={22} /></Button>
                              <Button icon title='Finalizar Pedido' variant='success'><Check weight='bold' size={20} /></Button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}