import './RelatedProducts.css'
import data_product from '../../assets/data'

import Item from '../item/Item'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className='relatedproducts-item'>
        {data_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              image={item.image}
              price={item.price}
              discountPrice={item.discountPrice}
            />
          )
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
