export type ProductProps = {
  id: number
  name: string
  price: number
  type: string
}

export type ItemProps = {
  amount: number
  description: string
  product: ProductProps
}

export type OrderProps = {
  id: number
  status_order: StatusOrderProps
  status_payment: StatusPaymentProps
  client: string
  service: string
  created_at: Date
  update_at: Date
  total: number
  items: ItemProps[]
}

export type SellsProps = {
  id: number
  method_payment: StatusPaymentProps
  total_value: number
  discount: number
  order_id: number
}

export type StatusOrderProps = 'em preparação' | 'concluído' | 'finalizado'

export type StatusPaymentProps = 'em aberto' | 'pago' | 'cancelado'

export type MethodPaymentPros = 'dinheiro' | 'pix' | 'débito' | 'crédito'
