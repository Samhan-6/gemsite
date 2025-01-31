import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item-container'>
      <div className='item-card'>
        <Link to={`/product/${props.id}`}>
          <img onClick={window.scrollTo(0, 0)} src={props.image} alt='' />
        </Link>

        <div className='item-card-details'>
          <p>{props.name}</p>

          <div className='item-prices'>
            <div className='item-price-new'>${props.discountPrice}</div>
            <div className='item-price-old'>${props.price}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
