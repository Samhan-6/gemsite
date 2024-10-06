// to run --> npm run dev

const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');

// load env vars
dotenv.config({ path: './config/config.env' });

// Databse connection
connectDB();

// route file
const products = require('./routes/products');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

// initialize app variable with express()
const app = express();

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// file upload
app.use(fileUpload());

app.use(cors());

// use static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/api/v1/products', products);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

// in order to run server we need to call .listen()
// and then we can also make console.log() to show port info in the terminal
const server = app.listen(
  PORT,
  console.log(
    `Server Running on the ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);

// handle unhandled rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close the server & exit
  server.close(() => {
    process.exit(1);
  });
});
