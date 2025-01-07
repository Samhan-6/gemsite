// const ErrorResponse = require('../utils/errorResponse')
// const asyncHandler = require('../middleware/async')
const Review = require('../models/Review')
const Product = require('../models/Product')
const factory = require('./handlerFactory')

// this function should be called in the create review route
exports.setProductUserId = (req, res, next) => {
  // allow nested routes
  if (!req.body.product) req.body.product = req.params.productId
  if (!req.body.user) req.body.user = req.user.id

  next()
}

// @desc    get reviews
// @route   GET /api/v1/reviews
// @route   GET /api/v1/products/:productId/reviews
// access   Public
exports.getReviews = factory.getAll(Review)

// @desc    get single review
// @route   GET /api/v1/reviews/:id
// access   Public
exports.getReview = factory.getOne(Review)

// @desc    Create review
// @route   POST /api/v1/products/:productId/reviews
// access   Private
exports.createReview = factory.createOne(Review)

// @desc    Update review
// @route   PUT /api/v1/reviews/:id
// access   Private
exports.updateReview = factory.updateOne(Review)

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// access   Private
exports.deleteReview = factory.deleteOne(Review)
