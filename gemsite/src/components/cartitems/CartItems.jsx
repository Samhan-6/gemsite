import { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'

import remove_icon from '../../assets/cart_cross_icon.png'

const CartItems = () => {
  const { getTotalCartAmounts, all_product, cartItems, removeFromCart } = useContext(ShopContext)

  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e, id) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={id}>
              <div className='cartitems-format cartitems-format-main'>
                <img src={e.image} alt='' className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className='cartitems-remove-icon'
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id)
                  }}
                  alt=''
                />
              </div>
              <hr />
            </div>
          )
        }
        return null
      })}

      <div className='cartitems-down'>
        <div className='cartitems-total'>
          <h1>Cart Totals</h1>
          <div>
            <div className='cartitems-total-item'>
              <p>Subtotal</p>
              <p>${getTotalCartAmounts()}</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <h3>Total</h3>
              <h3>${getTotalCartAmounts()}</h3>
            </div>
            <div className='cartitems-button'>
              <button className='continue-shop-btn'>Continue Shopping</button>
              <button className='buy-btn'>Contact to Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
