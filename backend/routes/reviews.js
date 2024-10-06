const express = require('express');

const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');

// initialize the router
const router = express.Router();

router.route('/').get(getReviews).post(addReview);

router.route('/:id').get(getReview).put(updateReview).delete(deleteReview);

module.exports = router;
