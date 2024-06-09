import hand_icon from '../../assets/icons/hand_icon.png'
import arrow_icon from '../../assets/icons/arrow.png'
import hero from '../../assets/hero_image.png'
import './Hero.css'

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-left'>
        <div>
          <h2>Feeling a bit... dull?</h2>
        </div>

        <h2>We have got the sparkle you need.</h2>

        <div>
          <p>Add a touch of vibrant personality to your life with our dazzling gemstones.</p>
        </div>

        <div className='hero-latest-btn'>
          <div>Explore our collections</div>
          <img src={arrow_icon} alt='' />
        </div>
      </div>
      <div className='hero-right'>
        <img src={hero} alt='' />
      </div>
    </div>
  )
}

export default Hero
