import { createContext, ReactNode, useEffect, useState } from "react"
import { ProductProps } from "../types"
import { api } from "../api"

type ProductContextProps = {
  products: ProductProps[]
  isLoading: boolean
}

type ProductProviderProps = {
  children: ReactNode
}

export const ProductContext = createContext({} as ProductContextProps)

export function ProductProvider({ children } : ProductProviderProps) {

  const [ products, setProducts ] = useState<ProductProps[]>([])
  const [ isLoading, setIsLoading ] = useState(false)

  async function getProducts() {
    setIsLoading(true)
    await api.get("products/").then(x => setProducts(x.data)).finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!products.length) {
      getProducts()
    }
  }, [])

  return (
    <ProductContext.Provider value={{products, isLoading}}>
      {children}
    </ProductContext.Provider>
  )
}