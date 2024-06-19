import './Contact.css'
import { useState } from 'react'
import email_icon from '../../assets/email.png'
import telephone_icon from '../../assets/telephone.png'
import address_icon from '../../assets/location.png'

const Contact = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data submitted:', formData)
    setFormData({
      fname: '',
      lname: '',
      email: '',
      message: '',
    })
  }

  return (
    <div className='contact'>
      {/* in top position */}
      <div className='get-in-touch'>
        <h1>Get In Touch</h1>
        <p>
          At Samhan Gems, we value your questions, comments, and feedback. Whether you're curious about our exquisite
          gemstone collection, need assistance with a purchase, or have a special request, we're here to help. Our
          dedicated team of gemstone experts is committed to providing you with the best service and ensuring your
          experience with us is exceptional.
        </p>
      </div>

      {/* in left position */}
      <div className='contact-info'>
        <h2>Contact Information</h2>
        <p>
          <img src={email_icon} alt='' className='icon' />
          <span>Email</span> <a href='mailto:msmsamhan844@gmail.com'>msmsamhan844@gmail.com</a>
        </p>
        <hr />
        <p>
          <img src={telephone_icon} alt='' className='icon' />
          <span>Phone</span> <a href='tel:+94761509204'>+94 (076) 150-9204</a>
        </p>
        <hr />
        <p>
          <img src={address_icon} alt='' className='icon' />
          <span>Address</span> 17, China Fort, Beruwala
        </p>
        <hr />
      </div>

      {/* in right position */}
      <div className='contact-form'>
        <form onSubmit={handleSubmit}>
          <h2>Message Us</h2>

          <label htmlFor='fname'>First Name</label>
          <input type='text' id='fname' name='fname' value={formData.fname} onChange={handleChange} required />

          <label htmlFor='lname'>Last Name</label>
          <input type='text' id='lname' name='lname' value={formData.lname} onChange={handleChange} required />

          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} required />

          <label htmlFor='message'>Message</label>
          <input type='text' id='message' name='message' value={formData.message} onChange={handleChange} required />

          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
