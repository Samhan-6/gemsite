const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    slug: String,
    description: {
      type: String,
      require: [true, 'Please add a description'],
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
    category: {
      type: [String],
      required: true,
      enum: ['precious', 'semi', 'unique'],
    },
    new_price: {
      type: Number,
      required: true,
    },
    old_price: {
      type: Number,
      required: true,
    },
    // this used for single image which mean main image
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },
    // multiple image access for side views of products
    photos: [
      {
        url: {
          type: String,
        },
        alt: {
          type: String,
          default: 'no-photo.jpg',
        },
      },
    ],
    // ratings
    ratings: {
      type: Number,
      default: 1,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Product', ProductSchema);
