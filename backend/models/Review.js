const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a title for review'],
      maxlength: [50, 'No more than 50 words'],
    },
    text: {
      type: String,
      required: [true, 'Please add some text'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

// prevent user from submitting more than 1 review for each product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

// static method to get average rating and save
ReviewSchema.statics.getAverageRating = async function (productId) {
  const obj = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: '$product',
        averageRating: {
          $avg: '$rating',
        },
      },
    },
  ]);

  try {
    await this.model('Product').findByIdAndUpdate(productId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

// call getAverageRating before save
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.product);
});

// call getAverageRating before remove
ReviewSchema.pre('deleteOne', { document: true }, function () {
  this.constructor.getAverageRating(this.product);
});

exports.model = mongoose.model('Review', ReviewSchema);
