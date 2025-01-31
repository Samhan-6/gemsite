const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const multer = require('multer')

const ErrorResponse = require('./utils/errorResponse')
const errorHandler = require('./middleware/error')

const productRoute = require('./routes/products')
const userRoute = require('./routes/users')
const reviewRoute = require('./routes/reviews')
const cartRoute = require('./routes/cart')

const app = express()

// 1) GLOBAL MIDDLEWARES

// set security headers
app.use(helmet())

const corsOptions = {
  origin: 'http://localhost:5173',
  // methods: ['GET', 'POST'], // Specify allowed HTTP methods
  // allowedHeaders: ['Content-Type'], // Specify allowed headers
  credentials: true,
}

// enable cors
app.use(cors(corsOptions))

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// limit request from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
})

// limit access to routes that starts with /api
app.use('/api', limiter)

// body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }))

// NOTE: we use data sanitize after the body parser which is the best place to do

// Data sanitize against NoSQL query injection
app.use(mongoSanitize())

// Data sanitize against XSS
app.use(xss())

// Prevent Parameter Polution
app.use(hpp())

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

app.use('/api/v1/products', productRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/cart', cartRoute)

// custom error => if the url is not found
app.all('*', (req, res, next) => {
  next(new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)

module.exports = app
