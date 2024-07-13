import './NewsLetter.css'
import { useState } from 'react'

const NewsLetter = () => {
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)

  function handleInput(event) {
    setEmail(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (email === '' || !/\S+@\S+\.\S+/.test(email)) {
      setIsEmailValid(false)
    } else {
      setIsEmailValid(true)
      alert(`Thanks you for subscribing our newsletter ${email}`)
      console.log(`You are subscribed to our Newsletter successfully - ${email}`)
      setEmail('')
    }
  }
  return (
    <div className='newsletter'>
      <h1>Subscribe to our Newsletter</h1>
      <p>
        Stay Informed About <span>Rajwa Gems</span> Latest Gems & Exclusive Launches
      </p>

      {!isEmailValid && <p className='error-message'>Please enter a valid email address</p>}

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Enter your Email Address here'
          value={email}
          onChange={handleInput}
          className={isEmailValid ? '' : 'error'}
        />
        <button type='submit'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter
