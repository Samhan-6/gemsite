const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc    get all users
// @route   GET /api/v1/users
// access   public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    get single user
// @route   GET /api/v1/users/:id
// access   public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  //   if (!user) {
  //     return next(
  //       new ErrorResponse(`User is not found with id of ${req.params.id}`, 404),
  //     );
  //   }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    create users
// @route   POST /api/v1/users
// access   Private
exports.addUsers = asyncHandler(async (req, res, next) => {
  const users = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: users,
  });
});

// @desc    Update users
// @route   PUT /api/v1/users/:id
// access   Private
exports.updateUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: users,
  });
});

// @desc    Delete users
// @route   DELETE /api/v1/users/:id
// access   Private
exports.deleteUsers = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
