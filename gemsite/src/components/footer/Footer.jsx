import './Footer.css'
import instagram_icon from '../../assets/instagram_icon.png'
import facebook_icon from '../../assets/facebook.png'
import whatsapp_icon from '../../assets/whatsapp_icon.png'
import wechat_icon from '../../assets/wechat.png'

const Footer = () => {
  return (
    <div className='footer'>
      <ul className='footer-links'>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
        <li>Services</li>
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
        <p>Copyright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
