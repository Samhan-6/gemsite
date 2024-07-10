import './About.css'
import mission_img from '../../assets/images/we.jpeg'
import founding_story_img from '../../assets/images/gemring.jpg'

const About = () => {
  return (
    <div className='about-page'>
      <div className='about-header'>
        <h2>About Us</h2>
      </div>

      <div className='about'>
        <div className='mission'>
          <div className='img-right'>
            <img src={mission_img} alt='' />
          </div>
          <div className='content-left'>
            <h1>Our Mission</h1>
            <p>
              At Samhan Gems, our mission is to provide the highest quality gemstones to our discerning customers,
              delivering unmatched beauty and value with every piece. We are dedicated to sourcing and selling the
              finest gems, ensuring authenticity and excellence. Our passion lies in connecting buyers with the perfect
              gemstones that meet their desires and exceed their expectations. We strive to build lasting relationships
              with our clients through exceptional service, integrity, and a commitment to sharing the timeless allure
              of gemstones with the world.
            </p>
          </div>
        </div>

        <div className='founding-story'>
          <div className='img-left'>
            <img src={founding_story_img} alt='' />
          </div>
          <div className='content-right'>
            <h1>Our Story</h1>
            <p>
              Our Story At Samhan Gems, our passion for gemstones goes beyond business—it's a journey of discovery,
              beauty, and connection. Founded in 2020 by Samhan, we started with a mission to bring the world's finest
              gemstones directly to those who appreciate their unique splendor. Our customers are gem enthusiasts who
              dream of finding the perfect stone that tells their story. They seek authenticity, quality, and beauty,
              often feeling anxious about the authenticity and value of their investment. We understand the frustration
              of searching for reputable sources and the joy that comes with discovering a gem that resonates deeply.
              From the vibrant mines of Sri Lanka to the rich markets of China, we travel the globe to source
              exceptional gems. Each stone in our collection is meticulously selected for its beauty and authenticity,
              ensuring it meets our high standards. At Samhan Gems, we are dedicated to making your gemstone buying
              experience seamless and rewarding. We value integrity, transparency, and exceptional customer service, and
              we are here to guide you every step of the way. Join us in celebrating the timeless allure of gemstones.
              Discover your perfect gem with Samhan Gems, where your story finds its sparkle.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
