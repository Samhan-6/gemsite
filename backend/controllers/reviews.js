const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    get reviews
// @route   GET /api/v1/reviews
// @route   GET /api/v1/products/:productId/reviews
// access   Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.productId) {
    const reviews = await Review.find({ product: req.params.productId });

    res.status(200).json({
      success: false,
      count: reviews.length,
      data: reviews,
    });
  } else {
    // res.status(200).json(res.advanceResults);
  }
});

// @desc    get single review
// @route   GET /api/v1/reviews/:id
// access   Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'product',
    select: 'name description',
  });

  if (!review) {
    return next(
      new ErrorResponse(`No Review found with id of ${req.params.id}`, 404),
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc    Add review
// @route   POST /api/v1/products/:productId/reviews
// access   Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.product = req.params.productId;
  res.body.user = req.user.id;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`No product with id of ${req.params.productId}`, 404),
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc    Update review
// @route   PUT /api/v1/reviews/:id
// access   Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  // first, let's check if there is a review with id
  let review = await Review.findById(req.params.id);

  // if there is a no review, we need to throw an error message
  if (!review) {
    return next(
      new ErrorResponse(`There is no review with id of ${req.params.id}`, 404),
    );
  }

  // make sure review belongs to user or user is not admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorize to update the review`, 401));
  }

  // then we need to update
  review = await findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // our data
  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// access   Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404),
    );
  }

  // make sure review belongs to user or user is not admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorize to update the review`, 401));
  }

  await review.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
