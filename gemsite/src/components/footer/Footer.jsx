import './Footer.css'
import instagram_icon from '../../assets/instagram_icon.png'
import facebook_icon from '../../assets/facebook.png'
import whatsapp_icon from '../../assets/whatsapp_icon.png'
import wechat_icon from '../../assets/wechat.png'

import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <ul className='footer-links'>
        <li>Offices</li>

        <Link to='/about' style={{ textDecoration: 'none', color: 'black' }}>
          <li>About</li>
        </Link>

        <Link to='/contact' style={{ textDecoration: 'none', color: 'black' }}>
          <li>Contact</li>
        </Link>

        <Link to='/services' style={{ textDecoration: 'none', color: 'black' }}>
          <li>Services</li>
        </Link>
      </ul>

      <div className='footer-social-icon'>
        <div className='footer-icons-container'>
          <img src={instagram_icon} alt='' />
        </div>
        <div className='footer-icons-container'>
          <img src={facebook_icon} alt='' />
        </div>
        <div className='footer-icons-container'>
          <img src={whatsapp_icon} alt='' />
        </div>
        <div className='footer-icons-container'>
          <img src={wechat_icon} alt='' />
        </div>
      </div>
      <div className='footer-copyright'>
        <hr />
        <p> &copy; 2024 - All Right Reserved. Rajwa Gems</p>
      </div>
    </div>
  )
}

export default Footer
