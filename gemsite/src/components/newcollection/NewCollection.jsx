import './NewCollection.css'
import Item from '../item/Item'
import { useEffect, useState } from 'react'

const NewCollection = () => {
  const [newCollection, setNewCollection] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/products/newcollections')
      .then((response) => response.json())
      .then((data) => setNewCollection(data))
  }, [])

  return (
    <div className='new-collections'>
      <h1>New Collections</h1>
      <hr />
      <div className='collections'>
        {newCollection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
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

export default NewCollection
