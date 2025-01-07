const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const APIFeatures = require('../utils/apiFeatures')

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(
        new ErrorResponse('There is no Document found with that ID', 404),
      )
    }

    res.status(204).json({
      success: true,
      data: null,
    })
  })

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) {
      return next(
        new ErrorResponse('There is no Document found with that ID', 404),
      )
    }

    res.status(200).json({
      success: true,
      data: {
        data: doc,
      },
    })
  })

exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body)

    res.status(201).json({
      success: true,
      data: {
        data: doc,
      },
    })
  })

exports.getOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id)

    if (populateOptions) query = query.populate(populateOptions)
    const doc = await query

    if (!doc) {
      return next(
        new ErrorResponse('There is no Document found with that ID', 404),
      )
    }

    res.status(200).json({
      success: true,
      data: {
        data: doc,
      },
    })
  })

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    let filter = {}
    // get all reivews on products
    if (req.params.productId) filter = { product: req.params.productId }
    // EXECUTE THE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const doc = await features.query

    res.status(200).json({
      success: true,
      results: doc.length,
      data: {
        data: doc,
      },
    })
  })
