import './NewCollection.css'
import Item from '../item/Item'
import { useEffect, useState } from 'react'

const NewCollection = () => {
  const [new_collection, setNew_collection] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/newcollections')
      .then((response) => response.json())
      .then((data) => setNew_collection(data))
  }, [])

  return (
    <div className='new-collections'>
      <h1>New Collections</h1>
      <hr />
      <div className='collections'>
        {new_collection.map((item, i) => {
          return <Item key={i} id={item.id} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewCollection
