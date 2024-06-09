import { useState } from 'react'
import './LoginSignup.css'

const LoginSignup = () => {
  const [state, setState] = useState('Sign In')

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    console.log('Login Function Executed', formData)
    let responseData
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data))

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace('/')
    } else {
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    console.log('Signup Function Executed', formData)
    let responseData
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data))

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace('/')
    } else {
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <div className='loginsignup-heading'>
          <h1>{state}</h1>
        </div>
        <div className='loginsignup-fields'>
          {state === 'Sign Up' ? (
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type='text'
              placeholder='Enter Your Name'
            />
          ) : (
            <></>
          )}
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type='email'
            placeholder='Enter Your Email Address'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type='password'
            placeholder='Enter Your Password'
          />
        </div>

        <div className='login-signup-btn-link'>
          <button
            onClick={() => {
              state === 'Sign In' ? login() : signup()
            }}>
            Continue
          </button>

          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => {
                  setState('Sign In')
                }}>
                Login Here
              </span>
            </p>
          ) : (
            <p>
              Create an Account?{' '}
              <span
                onClick={() => {
                  setState('Sign Up')
                }}>
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
