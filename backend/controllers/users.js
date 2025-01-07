const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')
const factory = require('./handlerFactory')

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })

  return newObj
}

// get personal details of own user
exports.getMe = asyncHandler(async (req, res, next) => {
  req.params.id = req.user.id
  next()
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

// @desc    get all users
// @route   GET /api/v1/users
// access   public
exports.getUsers = factory.getAll(User)

// @desc    get single user
// @route   GET /api/v1/users/:id
// access   public
exports.getUser = factory.getOne(User)

// @desc    create users
// @route   POST /api/v1/users
// access   Private
exports.createUser = factory.createOne(User)

// @desc    Update users
// @route   PUT /api/v1/users/:id
// access   Private
exports.updateUser = factory.updateOne(User)

// @desc    Delete users
// @route   DELETE /api/v1/users/:id
// access   Private
exports.deleteUser = factory.deleteOne(User)
