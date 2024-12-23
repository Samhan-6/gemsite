const express = require('express')

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload,
} = require('../controllers/products')

// initialize the router
const router = express.Router()

// file upload route
router.route('/:id/photos').put(productPhotoUpload)

router.route('/').get(getProducts).post(createProduct)

router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct)

module.exports = router
