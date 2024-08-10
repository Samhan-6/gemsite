import './Services.css'
import img_service_page from '../../assets/images/img-service-page.jpg'
import time_icon from '../../assets/icons/24-7.png'
import shipping_icon from '../../assets/icons/delivery.png'
import certificate_icon from '../../assets/icons/certificate.png'
import customer_requirement_icon from '../../assets/icons/customer-behavior.png'
import loyality_icon from '../../assets/icons/loyalty-program.png'

import NewsLetter from '../newsletter/NewsLetter'

const Services = () => {
  return (
    <div className='service'>
      <div className='img-section'>
        <img src={img_service_page} alt='' />
        <h2>Our Services</h2>
      </div>

      <div className='our-services'>
        <h2>
          Explore Our Services <br />& Solutions
        </h2>
        <p>
          We strive to provide exceptional service, integrity, and commitment in every aspect of our business, <br />
          ensuring that you receive the best gemstones tailored to your desires.
        </p>
      </div>

      <div className='services-content'>
        <div className='service-cards'>
          <div class='card'>
            <img src={time_icon} alt='' class='icon' />
            <h3>24/7 Customer Support</h3>
            <p>Our dedicated support team is available around the clock to assist you with any inquiries.</p>
          </div>
          <div class='card'>
            <img src={shipping_icon} alt='' class='icon' />
            <h3>Worldwide Shipping</h3>
            <p>
              We offer reliable international shipping with tracking and insurance to ensure your gemstones reach you
              safely.
            </p>
          </div>
          <div class='card'>
            <img src={certificate_icon} alt='' class='icon' />
            <h3>Gemstone Certification</h3>
            <p>Each gemstone comes with a certificate from renowned labs, ensuring authenticity and quality.</p>
          </div>
          <div class='card'>
            <img src={customer_requirement_icon} alt='' class='icon' />
            <h3>Customer Requirement</h3>
            <p>
              Looking for something unique? Our experts will source the perfect gemstone based on your specifications.
            </p>
          </div>
          <div class='card'>
            <img src={loyality_icon} alt='' class='icon' />
            <h3>Loyalty Programs</h3>
            <p>Join our loyalty program for exclusive discounts, promotions, and rewards.</p>
          </div>
        </div>
      </div>

      <NewsLetter />
    </div>
  )
}

export default Services
