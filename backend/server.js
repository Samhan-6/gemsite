// now we installed nodemon for automatic check
// to run --> npm start

const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')

const Product = require('./models/Product')
const Users = require('./models/User')

// load env vars
dotenv.config({path: './config/config.env'})

// Databse connection
connectDB()

// initialize app variable with express()
const app = express()

// body parser
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 4000


// api creation
app.get('/', (req, res) => {
    res.send('Express App is Running!')
})

// image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// creating upload endpoint for the image
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

// creating api for add products
app.post('/addproduct', async (req, res) => {

    let products = await Product.find({})
    let id
    if(products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1
    } else {
        id = 1
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })

    console.log(product);
    await product.save()
    console.log("Product Saved Successfully!");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// creating api for deleting products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id})
    console.log("Product Removed Successfully!");
    res.json({
        success: true,
        name: req.body.name
    })
})

// creating api for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({})
    console.log('All Products Fetched successfully!');
    res.send(products)
})

// creating endpoint for registering the user
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({email:req.body.email})
    if (check) {
        return res.status(400).json({success:false, errors:'existing user found with same email address'})
    }
    let cart = {}
    for(let i = 0; i < 300; i++) {
        cart[i] = 0
    }

    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save()

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({success: true, token})
})

// creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({email:req.body.email})
    if (user) {
        const passCompare = req.body.password === user.password
        if (passCompare) {
            const data = {
                user: {
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom')
            res.json({success:true, token})
        } 
        else {
            res.json({success:false, errors: "Wrong Password"})
        }
    }
    else {
        res.json({success:false, errors: 'Wrong Email Id'})
    }
})

// creating endpoint for newcollection data
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    console.log('New Collection Fetched');
    res.send(newcollection)
})

// creating endpoint for popular in precious gems
app.get('/popularinprecious', async (req, res) => {
    let products = await Product.find({category: 'precious'})
    let popular_in_precious = products.slice(0, 4)
    console.log('Popular in precious fetched');
    res.send(popular_in_precious)
})

// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) {
        res.status(401).send({errors: 'Please authenticate using valid token'})
    } 
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom')
            req.user = data.user
            next()
        } catch (error) {
            res.status(401).send({errors: 'please authenticate using a valid token'})
        }
    }
}

// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async(req, res) => {
    console.log('Added', req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
    res.send('Added')
})

// creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log('removed', req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
    res.send('Removed')
})

// creating endpoint to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
    console.log('Get Cart');
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData)
})


// in order to run server we need to call .listen()
// and then we can also make console.log() to show port info in the terminal
const server = app.listen(
    PORT,
    console.log(`Server Running on ${PORT}`.yellow.bold)
)

// handle unhandled rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // close the server & exit
    server.close(() => {
        process.exit(1)
    })
})