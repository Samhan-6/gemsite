import { createContext, useEffect, useState } from 'react'

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {
  const [allProduct, setAllProduct] = useState([])
  const [cartItems, setCartItems] = useState({})

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Errors: Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => setAllProduct(data.data))
      .catch((error) => console.error('Error fetching products:', error))

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/api/v1/users/cart', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token') || '',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data.cart))
    }
  }, [])

  // add to cart
  const addToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/api/v1/users/cart/add', {
        method: 'POST',
        headers: {
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      }).then((response) => response.json())
    }
  }

  // remove from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev }
      if (updatedCart[productId] > 0) updatedCart[productId] -= 1
      return updatedCart
    })

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/api/v1/users/cart/remove', {
        method: 'POST',
        headers: {
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      }).then((response) => response.json())
    }
  }

  // get total cart amount
  const getTotalCartAmounts = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const itemInfo = allProduct.find((product) => product._id === itemId)
      return itemInfo ? total + itemInfo.new_price * cartItems[itemId] : total
    }, 0)
  }

  // get total cart items
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0)
  }

  const contextValue = {
    allProduct,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmounts,
    getTotalCartItems,
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
