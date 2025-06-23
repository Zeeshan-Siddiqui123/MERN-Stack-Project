const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    file: {
        type: String,
        default: 'default.png'
    },
    cart: [
    {
      id: String,
      title: String,
      price: Number,
      quantity: Number,
      file: String,
    }
  ]
})

module.exports = mongoose.model('user', userSchema)