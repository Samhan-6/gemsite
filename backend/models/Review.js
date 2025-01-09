const mongoose = require('mongoose')
const Product = require('./Product')

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review cannot be empty!'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Review must belong to the Product'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to the User'],
  },
})

// populate
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
    select: 'name',
  }).populate({
    path: 'user',
    select: 'name photo',
  })
  next()
})

// calculate average ratings
reviewSchema.statics.calculateAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        numRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ])

  console.log(stats)

  await Product.findByIdAndUpdate(productId, {
    ratingsQuantity: stats[0].numRating,
    ratingsAverage: stats[0].avgRating,
  })
}

// save calculate average ratings in DB
reviewSchema.post('save', function () {
  // 'this' keyword points to current documents
  this.constructor.calculateAverageRatings(this.product)
})

// findOneAndUpdate
// findOneAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.model.findOne(this.getFilter())
  next()
})

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.review.constructor.calculateAverageRatings(this.review.product)
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
