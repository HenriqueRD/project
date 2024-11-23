export type ProductProps = {
  id: number
  name: string
  price: number
  type: string
}

export type ItemProps = {
  amount: number
  description: string
  total: number
  product: ProductProps
}

export type OrderProps = {
  id: number
  status: string
  client: string
  service: string
  createdAt: string
  total_value: number
  items: ItemProps[]
}