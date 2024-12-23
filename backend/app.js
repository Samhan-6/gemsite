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

const app = express()

// 1) GLOBAL MIDDLEWARES

// set security headers
app.use(helmet())

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

// custom error => if the url is not found
app.all('*', (req, res, next) => {
  next(new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)

module.exports = app

/*
// image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
    )
  },
})

const upload = multer({ storage: storage })

// creating upload endpoint for the image
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    imgage_url: `http:localhost:${port}/images/${req.file.filename}`,
  })
})

*/
