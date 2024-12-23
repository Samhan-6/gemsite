const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })

  return newObj
}

// @desc    get all users
// @route   GET /api/v1/users
// access   public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  })
})

exports.updateMe = asyncHandler(async (req, res, next) => {
  // 1) create an error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new ErrorResponse(
        'This route is not for password updates, Please use the /updateMyPassword route',
        401,
      ),
    )
  }
  // 2) filter out unwanted fields name that not allowed to be updated
  const filterBody = filterObj(req.body, 'name', 'email')

  // 3) update user document

  // we put filterBody instead of req.body in the findByIdAndUpdate(), because we don't want user to update all the information
  // if we put req.body they can easily update thier role, token and etc..
  // we need to create function which keeps 'name' & 'email' and filter out all the rest
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    status: true,
    data: {
      user: updatedUser,
    },
  })
})

exports.deleteMe = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: true,
    data: null,
  })
})

// @desc    get single user
// @route   GET /api/v1/users/:id
// access   public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse(`User is not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    create users
// @route   POST /api/v1/users
// access   Private
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body)

  res.status(201).json({
    success: true,
    data: user,
  })
})

// @desc    Update users
// @route   PUT /api/v1/users/:id
// access   Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    return next(new ErrorResponse('There is no user with that Id', 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    Delete users
// @route   DELETE /api/v1/users/:id
// access   Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id)

  res.status(204).json({
    success: true,
    data: null,
  })
})
