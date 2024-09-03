const mongoose = require('mongoose')

// shema creating for User model
const UserSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password: {
        type:String,
    },
    cartData:{
        type:Object,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model('User', UserSchema)