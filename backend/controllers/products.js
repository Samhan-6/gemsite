const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Product = require('../models/Product')
const factory = require('./handlerFactory')

// @desc    get all products
// @route   GET /api/v1/products
// access   public
exports.getProducts = factory.getAll(Product)

// @desc    get single product
// @route   GET /api/v1/products/:id
// access   Public
exports.getProduct = factory.getOne(Product, { path: 'reviews' })

// @desc    create  new products
// @route   POST /api/v1/products
// access   Private
exports.createProduct = factory.createOne(Product)

// @desc    Update products
// @route   PUT /api/v1/products/:id
// access   Private
exports.updateProduct = factory.updateOne(Product)

// @desc    Delete  products
// @route   DELETE /api/v1/products/:id
// access   Private
exports.deleteProduct = factory.deleteOne(Product)

// @desc    file uploads
// @route   PUT /api/v1/products/:id/photo
// access   Private
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(
      new ErrorResponse(
        `Product is not found with id of ${req.params.id}, 404`,
      ),
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload file`, 400))
  }

  const file = req.files.file

  // make sure image is photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload image file`, 400))
  }

  // check for file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload image less than ${process.env.MAX_FILE_UPLOAD}`,
        400,
      ),
    )
  }

  // create custom file name
  file.name = `photo_${product._id}${path.parse(file.name).ext}`

  // move file
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
    }

    return next(new ErrorResponse(`Problem with file upload`, 500))
  })

  await Product.findByIdAndUpdate(req.params.id, { photo: file.name })

  res.status(200).json({
    success: true,
    data: file.name,
  })
})

// below this code must be test

// creating api for upload image - ✅ successfully coded

// creating api for add products - ✅ successfully coded

// creating api for deleting products - ✅ successfully coded

// creating api for getting all products - ✅ successfully coded

// // creating endpoint for registering the user
// app.post(
//   '/signup',
//   asyncHandler(async (req, res) => {
//     let check = await Users.findOne({ email: req.body.email });
//     if (check) {
//       return res.status(400).json({
//         success: false,
//         errors: 'existing user found with same email address',
//       });
//     }
//     let cart = {};
//     for (let i = 0; i < 300; i++) {
//       cart[i] = 0;
//     }

//     const user = new Users({
//       name: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       cartData: cart,
//     });

//     await user.save();

//     const data = {
//       user: {
//         id: user.id,
//       },
//     };

//     const token = jwt.sign(data, 'secret_ecom');
//     res.json({ success: true, token });
//   }),
// );

// // creating endpoint for user login
// app.post(
//   '/login',
//   asyncHandler(async (req, res) => {
//     let user = await Users.findOne({ email: req.body.email });
//     if (user) {
//       const passCompare = req.body.password === user.password;
//       if (passCompare) {
//         const data = {
//           user: {
//             id: user.id,
//           },
//         };
//         const token = jwt.sign(data, 'secret_ecom');
//         res.json({ success: true, token });
//       } else {
//         res.json({ success: false, errors: 'Wrong Password' });
//       }
//     } else {
//       res.json({ success: false, errors: 'Wrong Email Id' });
//     }
//   }),
// );

// // creating endpoint for newcollection data
// app.get(
//   '/newcollection',
//   asyncHandler(async (req, res) => {
//     let products = await Product.find({});
//     let newcollection = products.slice(1).slice(-8);
//     console.log('New Collection Fetched');
//     res.send(newcollection);
//   }),
// );

// // creating endpoint for popular in precious gems
// app.get(
//   '/popularinprecious',
//   asyncHandler(async (req, res) => {
//     let products = await Product.find({ category: 'precious' });
//     let popular_in_precious = products.slice(0, 4);
//     console.log('Popular in precious fetched');
//     res.send(popular_in_precious);
//   }),
// );

// // creating middleware to fetch user
// const fetchUser = async (req, res, next) => {
//   const token = req.header('auth-token');
//   if (!token) {
//     res.status(401).send({ errors: 'Please authenticate using valid token' });
//   } else {
//     try {
//       const data = jwt.verify(token, 'secret_ecom');
//       req.user = data.user;
//       next();
//     } catch (error) {
//       res
//         .status(401)
//         .send({ errors: 'please authenticate using a valid token' });
//     }
//   }
// };

// // creating endpoint for adding products in cartdata
// app.post('/addtocart', fetchUser, async (req, res) => {
//   console.log('Added', req.body.itemId);
//   let userData = await Users.findOne({ _id: req.user.id });
//   userData.cartData[req.body.itemId] += 1;
//   await Users.findOneAndUpdate(
//     { _id: req.user.id },
//     { cartData: userData.cartData },
//   );
//   res.send('Added');
// });

// // creating endpoint to remove product from cartdata
// app.post('/removefromcart', fetchUser, async (req, res) => {
//   console.log('removed', req.body.itemId);
//   let userData = await Users.findOne({ _id: req.user.id });
//   if (userData.cartData[req.body.itemId] > 0)
//     userData.cartData[req.body.itemId] -= 1;
//   await Users.findOneAndUpdate(
//     { _id: req.user.id },
//     { cartData: userData.cartData },
//   );
//   res.send('Removed');
// });

// // creating endpoint to get cartdata
// app.post('/getcart', fetchUser, async (req, res) => {
//   console.log('Get Cart');
//   let userData = await Users.findOne({ _id: req.user.id });
//   res.json(userData.cartData);
// });
