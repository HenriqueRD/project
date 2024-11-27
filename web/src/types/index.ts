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
  status: string
  client: string
  service: string
  createdAt: string
  total: number
  items: ItemProps[]
}
export type StatusProps = 'em preparação' | 'finalizado' | 'cancelado' | 'null'