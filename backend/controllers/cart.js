const User = require('../models/User')

// Get User Cart
exports.getCart = async (req, res) => {
  const user = await User.findById(req.user.id).select('cart')
  res.status(200).json({
    success: true,
    cart: user.cart,
  })
}

// Add to Cart
exports.addToCart = async (req, res) => {
  const user = await User.findById(req.user.id)
  const { productId } = req.body

  user.cart[productId] = (user.cart[productId] || 0) + 1
  await user.save()

  res.status(200).json({
    success: true,
    cart: user.cart,
  })
}

// Remove from Cart
exports.removeFromCart = async (req, res) => {
  const user = await User.findById(req.user.id)
  const { productId } = req.body

  if (user.cart[productId] > 0) {
    user.cart[productId] -= 1
    if (user.cart[productId] === 0) delete user.cart[productId]
    await user.save()
  }

  res.status(200).json({
    success: true,
    cart: user.cart,
  })
}
