import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { useParams } from 'react-router-dom'
import BreadCrum from '../breadcrum/BreadCrum'
import ProductDisplay from '../productdisplay/ProductDisplay'
import DescriptionBox from '../descriptionbox/DescriptionBox'
import RelatedProducts from '../relatedproducts/RelatedProducts'

const Product = () => {
  const { allProduct } = useContext(ShopContext)
  const { id } = useParams()

  const product = allProduct.find((e) => e._id === id)

  return (
    <div>
      <BreadCrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
      <RelatedProducts product={product._id} />
    </div>
  )
}

export default Product
