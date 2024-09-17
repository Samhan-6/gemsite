const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  // let's create new variable called error and make copy from 'err' object
  // to do that we used spread operator => '...'
  let error = { ...err };

  // it takes all the property from 'err' and put in 'error' variable
  error.message = err.message;

  // log to console for dev
  console.log(err);

  // mongoose bad object id
  if (err.name === 'CastError') {
    const message = `Resource is not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // mongoose validation error
  if (err.name === 'ValidationError') {
    // doing little javascript to extract the message
    // let's get the values using 'Object.values'
    // Object.values(let's pass the 'err.errors', this will get the all the values of each one)
    // we need just the message, so we use map(this will map each one and we can extract what we want)
    const message = Object.values(err.errors).map((val) => val.message);
    // now let's put in the output message
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
