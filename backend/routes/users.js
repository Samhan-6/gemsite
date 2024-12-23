const express = require('express');

const {
  getUsers,
  getUser,
  addUsers,
  updateUsers,
  deleteUsers,
} = require('../controllers/users');

const router = express.Router();

router.route('/').get(getUsers).post(addUsers);

router.route('/:id').get(getUser).put(updateUsers).delete(deleteUsers);

module.exports = router;
