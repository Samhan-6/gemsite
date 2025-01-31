import { useContext } from 'react'
import './ShopCategory.css'
import { ShopContext } from '../../context/ShopContext'
import dropdown_icon from '../../assets/dropdown_icon.png'
import Item from '../item/Item'

const ShopCategory = (props) => {
  const { allProduct } = useContext(ShopContext)

  return (
    <div className='shopcategory'>
      <div className='shopcategory-index-sort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='shopcategory-sort'>
          Sort by <img src={dropdown_icon} alt='' />
        </div>
      </div>

      <div className='shopcategory-products'>
        {allProduct.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                image={item.image}
                discountPrice={item.discountPrice}
                price={item.price}
              />
            )
          } else {
            return null
          }
        })}
      </div>

      <div className='shopcategory-loadmore'>Explore More</div>
    </div>
  )
}

export default ShopCategory
