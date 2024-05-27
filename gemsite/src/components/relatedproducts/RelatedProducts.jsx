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
          return <Item key={i} id={item.id} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
