import Hero from '../hero/Hero'
import NewCollection from '../newcollection/NewCollection'
import NewsLetter from '../newsletter/NewsLetter'
import Offers from '../offers/Offers'
import Popular from '../popular/Popular'

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollection />
      <NewsLetter />
    </div>
  )
}

export default Shop
