const express = require('express')

const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setProductUserId,
} = require('../controllers/reviews')

const { protect, restrictTo } = require('../controllers/auth')

// initialize the router
const router = express.Router({ mergeParams: true })

router.use(protect)

router
  .route('/')
  .get(getReviews)
  .post(restrictTo('user'), setProductUserId, createReview)

router
  .route('/:id')
  .get(getReview)
  .put(restrictTo('admin'), updateReview)
  .delete(restrictTo('admin'), deleteReview)

module.exports = router
