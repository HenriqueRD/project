import { Check, ClipboardText, MagnifyingGlass, NotePencil } from '@phosphor-icons/react'
import { format, formatDistance, subDays } from 'date-fns'
import qs from 'qs'
import { ptBR } from 'date-fns/locale'
import Header from '../../../components/Header'
import Tag from '../../../components/Tag'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import { OrderProps, StatusOrderProps } from '../../../types'
import { FormEvent, useEffect, useState } from 'react'
import { api } from '../../../api'

export default function OrdersList() {

  const nav = useNavigate()
  const [ orders, setOrders ] = useState<OrderProps[]>([])
  const [ date, setDate ] = useState(new Date())
  const [ status, setStatus ] = useState<StatusOrderProps | "ALL">("EM_PREPARACAO")

  async function getOrders() { 
    await api.get("orders/", { params: {
      date: format(date, 'yyyy-MM-dd'),
      status: ["EM_PREPARACAO", "CONCLUIDO", "FINALIZADO"]
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }).then(x => setOrders(x.data))
  }

  useEffect(() => {    
    getOrders()
  }, [])

  async function handleSearchOrders(event : FormEvent) {
    event.preventDefault()
    if (status === "ALL") {
      getOrders()
    }
    await api.get("orders/", { params: {
      date: format(date, 'yyyy-MM-dd'),
      status: status
    } }).then(x => setOrders(x.data))
  }

  function handleClickOrder(id : number) {
    nav(`/pedido/${id}`)
  }
  
  return (
    <>
      <Header />
      <main className='mt-16 lg:mt-8'>
        <div className="container">
          <div className='bg-neutral-50 p-6 rounded border border-neutral-200 md:p-4'>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg">Pedidos</h3>
                    <Tag text={orders.length.toString()} type='normal' />
                  </div>
                  <Link to="/pedido/criar">
                    <Button text="Novo Pedido" title='Realizar Pedido' />
                  </Link>
                </div>
                <div className="flex justify-between">
                  <p>Filtrar pedidos por Data e Categoria</p>
                  <form onSubmit={handleSearchOrders} className="flex gap-2">
                    <select value={status} onChange={x => setStatus(x.target.value as StatusOrderProps)}>
                      <option value="EM_PREPARACAO">Em preparação</option>
                      <option value="CONCLUIDO">Concluído</option>
                      <option value="FINALIZADO">Finalizado</option>
                      <option value="ALL">Todos</option>
                    </select>
                    <input type="date" value={format(date, 'yyyy-MM-dd')} onChange={x => setDate(new Date(x.target.value+ "T00:00:00"))}/>
                    <Button type='submit' icon>
                      <MagnifyingGlass size={20} />
                    </Button>
                  </form>
                </div>
              </div>
              <div className="h-[32rem] border border-slate-300 rounded bg-white">
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope="col">Status</th>
                      <th scope="col">Cliente</th>
                      <th scope="col" className='thItems'>Itens</th>
                      <th scope="col">Criado</th>
                      <th scope="col">Serviço</th>
                      <th scope="col" className='thTotal'>Valor total</th>
                      <th scope="col" className='thButtons'>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.map(x => {
                        return (
                          <tr key={x.id} onClick={() => handleClickOrder(x.id)}>
                            <td><Tag text={x.statusOrder}/></td>
                            <td>{x.client}</td>
                            <td className='tdItems'>{x.items.length}</td>
                            <td><time title={format(x.createdAt, 'dd/MM/yyyy')} dateTime={x.createdAt.toString()}>{formatDistance(subDays(x.createdAt, 0), new Date(), {addSuffix: false, locale: ptBR})}</time></td>
                            <td><Tag text={x.service}/></td>
                            <td className={`tdTotal`}><Tag text={x.totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} type={x.statusPayment === "PAGO" ? "success" : "alert"} /></td>
                            <td className="buttons">
                              <Button icon title='Visualizar Pedido'><ClipboardText size={22} /></Button>
                              {
                                x.statusPayment !== "PAGO" && (
                                  <>
                                    <Button onClick={(e) => { e.stopPropagation(); nav(`/pedido/editar/${x.id}`)}} icon title='Editar Pedido' variant='alert'><NotePencil size={22} /></Button>
                                    <Button onClick={(e) => { e.stopPropagation(); nav(`/pedido/pagar/${x.id}`)}} icon title='Finalizar Pedido' variant='success'><Check weight='bold' size={20} /></Button>
                                  </>
                                )
                              }
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                {
                  orders.length === 0 && (
                    <div className='flex items-center justify-center w-full h-full'>
                      <span className='text-lg font-medium'>Nem um pedido encontado</span>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}