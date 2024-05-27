import './NewCollection.css'
import new_collection from '../../assets/new_collections'
import Item from '../item/Item'

const NewCollection = () => {
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
