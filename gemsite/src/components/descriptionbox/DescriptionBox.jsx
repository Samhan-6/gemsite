import { useParams } from 'react-router-dom'
import './DescriptionBox.css'
import { useEffect } from 'react'

const DescriptionBox = () => {
  const { id } = useParams() // Get product ID from URL
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`localhost:4000/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.data)
        setLoading(false)
      })
      .catch((error) =>
        console.error('found error while fetching data: ', error),
      )
  }, [id])

  if (loading) return <p>Product Loading....</p>
  if (!product) return <p>Product Not Found</p>

  return (
    <div className='descriptionbox'>
      <div className='descriptionbox-navigator'>
        <div className='descriptionbox-nav-box'>Description</div>
        <div className='descriptionbox-nav-box fade'>
          Reviews ({product.reviews.length})
        </div>
      </div>

      <div className='descriptionbox-description'>
        <p>{product.description}</p>
      </div>

      <div className='descriptionbox-reviews'>
        <h3>Customer Reviews</h3>
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review._id} className='review'>
              <p>
                <strong>{review.user.name}</strong> ({review.rating}/5)
              </p>
              <p>{review.review}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </div>
  )
}

export default DescriptionBox
