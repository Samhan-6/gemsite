import logo from './assets/logo/rajwa_gems.png'
import cart from './assets/icons/cart_icon.png'
import './Nav.css'

import { Link } from 'react-router-dom'
import { useContext, useRef, useState } from 'react'
import { ShopContext } from './context/ShopContext'

import nav_dropdown from './assets/drop_down.png'

const Nav = () => {
  const [menu, setMenu] = useState('shop')
  const { getTotalCartItems } = useContext(ShopContext)
  const menuRef = useRef()

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open')
  }

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <Link to='/'>
          <img src={logo} alt='' />
        </Link>
      </div>

      {/* dropdown image */}
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt='' />

      <ul ref={menuRef} className='nav-menu'>
        <li
          onClick={() => {
            setMenu('shop')
          }}>
          <Link style={{ textDecoration: 'none' }} to='/'>
            Shop
          </Link>{' '}
          {menu === 'shop' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('precious')
          }}>
          <Link style={{ textDecoration: 'none' }} to='/precious'>
            Precious Gems
          </Link>{' '}
          {menu === 'precious' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('semi')
          }}>
          <Link style={{ textDecoration: 'none' }} to='/semi'>
            Semi-Precious Gems
          </Link>{' '}
          {menu === 'semi' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('unique')
          }}>
          <Link style={{ textDecoration: 'none' }} to='/unique'>
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
    </div>
  )
}

export default Nav
