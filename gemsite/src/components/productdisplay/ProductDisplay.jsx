import './ProductDisplay.css'
import star_icon from '../../assets/star_icon.png'
import star_dull_icon from '../../assets/star_dull_icon.png'
import bag_cart from '../../assets/icons/shopping-bag.png'

import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'

const ProductDisplay = (props) => {
  const { product } = props

  const { addToCart } = useContext(ShopContext)

  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img-list'>
          <img src={product.photos} alt='' />
          <img src={product.photos} alt='' />
          <img src={product.photos} alt='' />
          <img src={product.photos} alt='' />
        </div>

        <div className='productdisplay-img'>
          <img
            className='productdisplay-main-img'
            src={product.mainImage}
            alt=''
          />
        </div>
      </div>

      {/* product details card */}
      <div className='productdisplay-right'>
        <h1>{product.name}</h1>
        <div className='productdisplay-right-star'>
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_dull_icon} alt='' />
          <p>(122)</p>
        </div>
        <div className='productdisplay-right-prices'>
          <div className='productdisplay-right-price-old'>${product.price}</div>
          <div className='productdisplay-right-price-new'>
            ${product.discountPrice}
          </div>
        </div>
        <div className='productdisplay-right-description'>
          {product.description}
        </div>

        <div className='callto-action'>
          {/* add to cart */}
          <button
            className='callto-action-primary'
            onClick={() => {
              addToCart(product._id)
            }}>
            <img src={bag_cart} alt='' />
          </button>

          {/* contact to buy section */}
          <button className='callto-action-secondary'>Contact to buy</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay
