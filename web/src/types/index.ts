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