const ErrorResponse = require('../utils/errorResponse')

const handleCastErrorDB = (err) => {
  const message = `There is no ${err.path} : ${err.value}`
  return new ErrorResponse(message, 400)
}

const handleDuplicateFieldDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]
  const message = `Duplicate field value: ${value} please use another value!`
  return new ErrorResponse(message, 400)
}

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  const message = `Invalid data input => ${errors.join(`. `)}`
  return new ErrorResponse(message, 400)
}

const handleJWTError = () => {
  return new ErrorResponse('Invalid token!, Please login again.', 401)
}

const handleJWTExpiredError = () => {
  return new ErrorResponse(
    'Your token has been expired! Please login again.',
    401,
  )
}

const sendErrorDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProduction = (err, res) => {
  // Operational, trusted error => we can send this type of error to the clients
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    })
    // Programming error, we don't want to leak this type of error to the clients
  } else {
    // 1) log to the console
    console.error('ERROR 💥', err)

    // 2) send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDevelopment(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    // handle caste error
    if (err.name === 'castError') err = handleCastErrorDB(err)
    // handle duplicate key error
    if (err.code === 11000) err = handleDuplicateFieldDB(err)
    // handle validation error
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err)
    // handle JsonWebTokenError
    if (err.name === 'JsonWebTokenError') err = handleJWTError()
    // handle TokenExpiredError
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError()

    sendErrorProduction(err, res)
  }
}
