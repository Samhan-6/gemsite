import './Contact.css'
import { useState } from 'react'
import axios from 'axios'
import email_icon from '../../assets/email.png'
import telephone_icon from '../../assets/telephone.png'
import address_icon from '../../assets/location.png'

import contact from '../../assets/icons/telephone-call.png'
import map from '../../assets/icons/maps-and-flags.png'
import mail from '../../assets/icons/mail.png'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // sample code, need to modify
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/api/contact', formData)
      .then((response) => {
        console.log('Form submitted successfully:', response.data)
      })
      .catch((error) => {
        console.error('There was an error submitting the form:', error)
      })
  }

  return (
    <div className='contact-page'>
      <div className='get-in-touch'>
        <h1>Contact Us</h1>
        <p>
          At Samhan Gems, we value your questions, comments, and feedback. Whether you're curious about our exquisite
          gemstone collection, need assistance with a purchase, or have a special request, we're here to help. Our //
          dedicated team of gemstone experts is committed to providing you with the best service and ensuring your //
          experience with us is exceptional.
        </p>
      </div>

      <div className='contact-info'>
        <div className='contact-card'>
          <img src={contact} alt='' className='icon' />
          <div>
            <h3>Phone Number</h3>
            <a href='tel:+94761509204'>+94 (076) 150-9204</a>
          </div>
        </div>

        <div className='contact-card'>
          <img src={mail} alt='' className='icon' />
          <div>
            <h3>Email Address</h3>
            <a href='mailto:msmsamhan844@gmail.com'>msmsamhan844@gmail.com</a>
          </div>
        </div>

        <div className='contact-card'>
          <img src={map} alt='' className='icon' />
          <div>
            <h3>Location</h3>
            <p>17, China Fort, Beruwala</p>
          </div>
        </div>
      </div>

      <div className='contact-form'>
        <h2>Send Message</h2>
        <p>
          If you have any questions about our products or services, please fill out the form below and we will get back
          to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit}>
          <div className='form-row'>
            <input
              type='text'
              placeholder='Your name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type='email'
              placeholder='Email address'
              name='name'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-row'>
            <input
              type='text'
              placeholder='Phone number'
              name='name'
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type='text'
              placeholder='Subject'
              name='name'
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            placeholder='Message'
            name='name'
            value={formData.message}
            onChange={handleChange}
            required></textarea>

          <button type='submit'>Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
