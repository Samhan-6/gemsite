const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')

// read config file
dotenv.config({ path: './config/config.env' })

// then we should require app
const app = require('./app')

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD)

mongoose.connect(DB).then((con) => {
  console.log(
    `DB connected successfully : ${con.connection.host}`.cyan.underline.bold,
  )
})

const port = process.env.PORT || 4000

const server = app.listen(port, () => {
  console.log(`server is running on port ${port}...`.blue.bold)
})

// finally: handling unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message)

  server.close(() => {
    process.exit(1)
  })
})

// // file upload
// app.use(fileUpload())

// app.use(cors())

// // use static folder
// app.use(express.static(path.join(__dirname, 'public')))
