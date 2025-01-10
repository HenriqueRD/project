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
  statusOrder: StatusOrderProps
  statusPayment: StatusPaymentProps
  client: string
  service: string
  createdAt: Date
  updatedAt: Date
  totalValue: number
  items: ItemProps[]
  sell: SellsProps[]
}

export type SellsProps = {
  id: number
  discount: number
  orderId: number
  methodPayment: MethodPaymentSellProps
  totalValue: number
}

export type TransactionsProps = {
  id: number
  type: string
  category: string
  totalValue: number
  methodPayment: MethodPaymentTransactionProps
  createdAt: Date
}

export type SupplierProps = {
  id: number
  name: string
  cnpj: string
  type: TypeSupplierExpenseProps
}

export type StatusOrderProps = 'EM_PREPARACAO' | 'CONCLUIDO' | 'FINALIZADO' | "ALL"

export type StatusPaymentProps = 'EM_ABERTO' | 'PAGO'

export type MethodPaymentSellProps = 'DINHEIRO' | 'PIX' | 'DEBITO' | 'CREDITO'

export type MethodPaymentExpenseProps = 'DINHEIRO' | 'PIX' | "BOLETO"

export type MethodPaymentTransactionProps = 'DINHEIRO' | 'PIX' | 'DEBITO' | 'CREDITO' | 'BOLETO'

export type TypeTransactionProps = 'ENTRADA' | 'SAIDA'

export type TypeSupplierExpenseProps = 'MERCADO' | 'SUPERMERCADO' | "DISTRIBUIDORA"
