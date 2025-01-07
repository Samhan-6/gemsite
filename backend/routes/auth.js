const express = require('express')

const { signup, login, protect } = require('../controllers/auth')

const router = express.Router()

// router.post('/signup', signup)
// router.post('/login', login)
// router.get('/logout', logout)
// router.get('/me', protect, getMe)
// router.put('/updatedetails', protect, updateDetails)
// router.put('/updatepassword', protect, updatePassword)
// router.post('/forgotpassword', forgotPassword)
// router.put('/resetpassword/:resettoken', resetPassword)

module.exports = router
