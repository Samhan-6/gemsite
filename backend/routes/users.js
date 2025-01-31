const express = require('express')

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/users')

const {
  protect,
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
} = require('../controllers/auth')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

// using protect middleware in all our routes
// after this line of code all the routes are protected
// so, we don't need to add protect middleware in each of routes
router.use(protect)

router.patch('/updateMyPassword', updatePassword)
router.get('/me', getMe, getUser)
router.patch('/updateMe', updateMe)
router.delete('/deleteMe', deleteMe)

router.use(restrictTo('admin'))

router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

module.exports = router
