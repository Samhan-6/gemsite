const mongoose = require('mongoose')
const slugify = require('slugify')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'Name can not be more than 50 characters'],
    minlength: [10, 'Name can not be less than 10 characters'],
  },
  slug: String,
  description: {
    type: String,
    require: [true, 'Please add a description'],
    maxlength: [300, 'Description can not be more than 500 characters'],
    minlength: [50, 'Description can not be less than 50 characters'],
  },
  category: {
    type: [String],
    required: true,
    enum: {
      values: ['precious', 'semi', 'unique'],
      message: 'Category is either : precious, semi, unique',
    },
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        return val < this.price
      },
      message: 'Discount price ({VALUE}) should be less than regular price',
    },
  },
  // this used for single image which mean main image
  mainImage: {
    type: String,
    unique: [true, 'Product must have main image'],
  },
  // multiple image access for side views of products
  photos: [String],
  ratings: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be greater than 1.0'],
    max: [5, 'Rating must be less than 5.0'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

// create product slug from the name
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

module.exports = mongoose.model('Product', productSchema)
