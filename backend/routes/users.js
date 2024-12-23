const express = require('express')

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controllers/users')

const {
  protect,
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/auth')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

router.patch('/updateMyPassword', protect, updatePassword)

router.patch('/updateMe', protect, updateMe)
router.delete('/deleteMe', protect, deleteMe)

router.route('/').get(getUsers).post(createUser)

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

module.exports = router
