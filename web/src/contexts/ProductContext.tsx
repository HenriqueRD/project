import { createContext, ReactNode, useEffect, useState } from "react"
import { ProductProps } from "../types"
import { api } from "../api"

type ProductContextProps = {
  products: ProductProps[]
}

type ProductProviderProps = {
  children: ReactNode
}

export const ProductContext = createContext({} as ProductContextProps)

export function ProductProvider({ children } : ProductProviderProps) {

  const [ products, setProducts ] = useState<ProductProps[]>([])

  async function getProducts() {
    await api.get("products").then(x => setProducts(x.data))
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <ProductContext.Provider value={{products}}>
      {children}
    </ProductContext.Provider>
  )
}