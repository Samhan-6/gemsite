const express = require('express')

const { getCart, addToCart, removeFromCart } = require('../controllers/cart')
const { protect } = require('../controllers/auth')

const router = express.Router()

router.use(protect)

// Cart Routes
router.get('/cart', getCart)
router.post('/cart/add', addToCart)
router.post('/cart/remove', removeFromCart)

module.exports = router
