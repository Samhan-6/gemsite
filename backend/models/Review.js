const mongoose = require('mongoose')

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

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
