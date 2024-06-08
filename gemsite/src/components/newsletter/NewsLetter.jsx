import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Subscribe to our Newsletter</h1>
      <p>
        Stay Informed About <span>Rajwa Gems</span> Latest Gems & Exclusive Launches{' '}
      </p>

      <div>
        <input type='email' placeholder='Email Address' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
