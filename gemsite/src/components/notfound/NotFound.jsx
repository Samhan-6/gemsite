import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundImg from '../../assets/images/notfound.jpg'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='not-found'>
      <img src={NotFoundImg} alt="" />
      <Link to='/' className='back-btn'>Back to Home</Link>
    </div>
  )
}

export default NotFound