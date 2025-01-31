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
          <a
            href='https://www.instagram.com/rajwa_gems/'
            target='_blank'
            rel='noopener noreferrer'>
            <img src={instagram_icon} alt='Instagram' />
          </a>
        </div>
        <div className='footer-icons-container'>
          <a href='#facebook' target='_blank' rel='noopener noreferrer'>
            <img src={facebook_icon} alt='Facebook' />
          </a>
        </div>
        <div className='footer-icons-container'>
          <a
            href='https://wa.me/+94761509204'
            target='_blank'
            rel='noopener noreferrer'>
            <img src={whatsapp_icon} alt='WhatsApp' />
          </a>
        </div>
        <div className='footer-icons-container'>
          <a
            href='https://drive.google.com/uc?export=view&id=1onvPtMhfdE908_4lBd5oCBSUeoPXvVNQ'
            target='_blank'
            rel='noopener noreferrer'>
            <img src={wechat_icon} alt='Wechat' />
          </a>
        </div>
      </div>
      <div className='footer-copyright'>
        <hr />
        <p> &copy; 2024 - All Right Reserved. Samhan Gems</p>
      </div>
    </div>
  )
}

export default Footer
