import { createContext, useEffect, useState } from 'react'

import axiosInstance from '../api/axiosInstance'

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products')
        setAll_Product(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const contextValue = { all_product }

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}

export default ShopContextProvider
