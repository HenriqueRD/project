export type ProductProps = {
  id: number
  name: string
  price: number
  type: string
}

export type ItemProps = {
  id?: number
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
  updated_at: Date
  total_value: number
  items: ItemProps[]
  sell: SellsProps[]
}

export type SellsProps = {
  id: number
  discount: number
  order_id: number
}

export type TransactionsProps = {
  id: number
  type: string
  category: string
  total_value: number
  created_at: Date
}

export type StatusOrderProps = 'EM_PREPARACAO' | 'CONCLUIDO' | 'FINALIZADO' | "ALL"

export type StatusPaymentProps = 'EM_ABERTO' | 'PAGO'

export type MethodPaymentPros = 'DINHEIRO' | 'PIX' | 'DEBITO' | 'CREDITO'
