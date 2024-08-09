import logo from './assets/logo/rajwa_gems.png'
import cart from './assets/icons/cart_icon.png'
import './Nav.css'

import { Link } from 'react-router-dom'
import { useContext, useRef, useState } from 'react'
import { ShopContext } from './context/ShopContext'

import nav_dropdown from './assets/drop_down.png'

const Nav = () => {
  const [menu, setMenu] = useState('shop')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalCartItems } = useContext(ShopContext)
  const menuRef = useRef()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <Link to='/' onClick={() => setMenu('shop')}>
          <img src={logo} alt='' />
        </Link>
      </div>

      <ul ref={menuRef} className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <li
          onClick={() => {
            setMenu('shop')
            setIsMobileMenuOpen(false)
          }}>
          <Link style={{ textDecoration: 'none', color: '#011F26' }} to='/'>
            Shop
          </Link>{' '}
          {menu === 'shop' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('precious')
            setIsMobileMenuOpen(false)
          }}>
          <Link style={{ textDecoration: 'none', color: '#011F26' }} to='/precious'>
            Precious Gems
          </Link>{' '}
          {menu === 'precious' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('semi')
            setIsMobileMenuOpen(false)
          }}>
          <Link style={{ textDecoration: 'none', color: '#011F26' }} to='/semi'>
            Semi-Precious Gems
          </Link>{' '}
          {menu === 'semi' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('unique')
            setIsMobileMenuOpen(false)
          }}>
          <Link style={{ textDecoration: 'none', color: '#011F26' }} to='/unique'>
            Unique Gems
          </Link>{' '}
          {menu === 'unique' ? <hr /> : <></>}
        </li>
      </ul>

      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token') ? (
          <button
            onClick={() => {
              localStorage.removeItem('auth-token')
              window.location.replace('/')
            }}>
            Logout
          </button>
        ) : (
          <Link to='/login'>
            {' '}
            <button>Login</button>{' '}
          </Link>
        )}

        <Link to='/cart'>
          <img src={cart} alt='' />
        </Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>

      {/* setting hurmburger menu only for mobile view */}
      <div className='hamburger' onClick={toggleMobileMenu}>
        <div className={`line ${isMobileMenuOpen ? 'active' : ''}`}></div>
        <div className={`line ${isMobileMenuOpen ? 'active' : ''}`}></div>
        <div className={`line ${isMobileMenuOpen ? 'active' : ''}`}></div>
      </div>
    </div>
  )
}

export default Nav
