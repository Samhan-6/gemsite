const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// load env variables
dotenv.config({ path: './config/config.env' });

// load models
const Product = require('./models/Product');

// connect to databse
mongoose.connect(process.env.MONGO_URI);

// read JSON file
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8'),
);

// import into DB
const importData = async () => {
  try {
    await Product.create(products);

    console.log(`Data Imported...`.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// destry data
const deleteData = async () => {
  try {
    await Product.deleteMany();

    console.log(`Data Destroyed...`.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
