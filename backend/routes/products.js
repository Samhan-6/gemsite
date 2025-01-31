const express = require('express')

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload,
  getPopularInPrecious,
  getNewCollection,
} = require('../controllers/products')

const { protect, restrictTo } = require('../controllers/auth')

const reviewRouter = require('./reviews')

// initialize the router
const router = express.Router()

// adding review route, so user can create new reviews on products
router.use('/:productId/reviews', reviewRouter)

// file upload route
router.route('/:id/photos').put(productPhotoUpload)

router
  .route('/')
  .get(getProducts)
  .post(protect, restrictTo('admin'), createProduct)

router
  .route('/:id')
  .get(getProduct)
  .put(protect, restrictTo('admin'), updateProduct)
  .delete(protect, restrictTo('admin'), deleteProduct)

router.route('/newcollection').get(getNewCollection)
router.route('/popularinprecious').get(getPopularInPrecious)

module.exports = router
