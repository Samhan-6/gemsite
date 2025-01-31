import './Popular.css'
import Item from '../item/Item'
import { useEffect, useState } from 'react'

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/products/popularinprecious')
      .then((response) => response.json())
      .then((data) => setPopularProducts(data))
  }, [])

  return (
    <div className='popular'>
      <h1>Featured Gems</h1>
      <hr />
      <div className='popular-item'>
        {popularProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              discountPrice={item.discountPrice}
              price={item.price}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Popular
