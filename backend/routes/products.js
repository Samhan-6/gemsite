const express = require('express');

const {
  getProducts,
  addProducts,
  getProduct,
  updateProducts,
  deleteProducts,
  productPhotoUpload,
} = require('../controllers/products');

// initialize the router
const router = express.Router();

// file upload route
router.route('/:id/photos').put(productPhotoUpload);

router.route('/').get(getProducts).post(addProducts);

router.route('/:id').get(getProduct).put(updateProducts).delete(deleteProducts);

module.exports = router;
