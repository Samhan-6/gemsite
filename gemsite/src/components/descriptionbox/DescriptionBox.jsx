import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className='descriptionbox-navigator'>
        <div className='descriptionbox-nav-box'>Description</div>
        <div className='descriptionbox-nav-box fade'>Reviews (1)</div>
      </div>

      <div className='descriptionbox-description'>
        <p>
          Nature's artistry captured in stone, each gem reflects light in a dazzling display of color. From fiery opals
          to deep sapphires, their brilliance captivates the eye and ignites the imagination.
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox
