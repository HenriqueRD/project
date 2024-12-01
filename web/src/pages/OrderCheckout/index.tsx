import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import style from './styles.module.css'
import { api } from '../../api'
import { MethodPaymentPros, OrderProps } from '../../types'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Bank, CreditCard, CurrencyDollar, PixLogo } from '@phosphor-icons/react'
import CardItem from '../../components/CardItem'
import Tag from '../../components/Tag'
import Button from '../../components/Button'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export default function OrderCheckout() {

  const [ order, setOrder ] = useState<OrderProps>({} as any)
  const { id } = useParams()
  const [ isLoading, setIsLoading ] = useState(false)
  const nav = useNavigate()
  const [ selectMethodPay, setSelectMethodPay ] = useState<MethodPaymentPros>("dinheiro")
  const [ discount, setdDiscount ] = useState(0)


  async function getOrder(idOrder : string) {
    await api.get<OrderProps>(`orders/${idOrder}`).then(x => setOrder(x.data)).catch(() => alert("Erro"))
  }

  useEffect(() => {
    if (id) {
      getOrder(id)
    }
  }, [id])

  if (!order.created_at) return <h1>oi</h1>
  if (!order.update_at) return <h1>oi</h1>

  async function handlePaymentOrder(isFinish: boolean) {
    setIsLoading(true)
    if (isFinish) {
      await api.post("sells", {
        method_payment: selectMethodPay,
        discount,
        order_id: order.id
      }).then(() => {
        api.put("orders", {
          id: order.id,
          status_order: "finalizado"
        }).then(() => {
          toast.success("Pedido pago e finalizado")
          setIsLoading(false)   
          nav("/")
        })
      }).catch(() => { 
        toast.error("Falha no pagamento")
        setIsLoading(false) 
      })
    }
    else {
      await api.post("sells", {
        method_payment: selectMethodPay,
        discount,
        order_id: order.id
      }).then(() => {
          toast.success("Pedido pago")
          setIsLoading(false)   
          nav("/")
      }).catch(() => { 
        toast.error("Falha no pagamento")
        setIsLoading(false) 
      })
    }
    setIsLoading(false) 
    setdDiscount(0)
  }



  return (
    <>
      <Header />
      <main id={style.orderCheckout}>
        <div className="container">
          <div className="content">
            <div className={style.content}>
              <div className={style.order}>
                <div className={style.contentOrder}>
                  <div className={style.headerInfo}>
                    <div>
                      <h3>Pagamento do pedido #{order.id}</h3>
                      <Tag text={order.status_payment} />
                    </div>
                    <div>
                      <Link to={`/pedido/${order.id}`}><ArrowLeft size={18} /> Voltar ao pedido</Link>
                      <div className={style.dates}>
                        <span>Criado em {format(new Date(order.created_at), 'dd/MM/yyyy HH:mm')}</span>
                        <span>Atualizado em {format(new Date(order.update_at), 'dd/MM/yyyy  HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                  <div className={style.methodPays}>
                    <span>Método de pagamento</span>
                    <div className={style.buttons}>
                      <Button onClick={() => setSelectMethodPay("dinheiro")} text='Dinheiro' title='Pagar com dinheiro' isActive={selectMethodPay === "dinheiro"}>
                        <CurrencyDollar size={20} />
                      </Button>
                      <Button onClick={() => setSelectMethodPay("pix")} text='Pix' title='Pagar com pix' isActive={selectMethodPay === "pix"}>
                        <PixLogo size={20} />
                      </Button>
                      <Button onClick={() => setSelectMethodPay("débito")} text='Débito' title='Pagar com cartão de débito' isActive={selectMethodPay === "débito"}>
                        <Bank size={20} />
                      </Button>
                      <Button onClick={() => setSelectMethodPay("crédito")} text='Crédito' title='Pagar com cartão de crédito' isActive={selectMethodPay === "crédito"}>
                        <CreditCard size={20} />
                      </Button>
                    </div>
                  </div>
                  <div className={style.totalOrder}>
                    <h3>Resumo do Pagamento</h3>
                    <div>
                      <div className={style.box}>
                        <span>Subtotal dos itens</span>
                        <span className={style.value}>+ R$ 72,00</span>
                      </div>
                      <div className={style.box}>
                        <span>Desconto</span>
                        <span className={style.value}>- {discount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                      </div>
                      <div className={style.box}>
                        <span>Forma de Pagamento</span>
                        <span className={`${style.methodPay} ${style.value}`}>{selectMethodPay}</span>
                      </div>
                      <div className={style.totalValue}>
                        <span className={style.value}>Total Final</span>
                        <span className={style.value}>R$ 72,00</span>
                      </div>
                    </div>
                  </div>  
                </div>
                <div className={style.actionOrder}>
                  {
                    order.status_payment === "em aberto" && (
                      <>
                        <Button disabled={isLoading} onClick={() => handlePaymentOrder(true)} title={order.status_payment === "em aberto" ? 'Ir para o pagamento e finalizar' : "Finalizar pedido" } type='button' variant='success' text='Finalizar e Pagar' />
                        <Button disabled={isLoading} onClick={() => handlePaymentOrder(false)} title='Ir para o pagamento ' type='button' text='Pagar' />
                      </>
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