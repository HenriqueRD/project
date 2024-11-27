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
  status_order: string
  status_payment: string
  client: string
  service: string
  createdAt: string
  total: number
  items: ItemProps[]
}

export type StatusOrderProps = 'em preparação' | 'finalizado' | 'cancelado' | 'null'

export type StatusPaymentProps = 'em aberto' | 'pago' | 'cancelado'