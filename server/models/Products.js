const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')

const productSchema = mongoose.Schema({
    file: String,
    title: String,
    price: Number,
    description: String,
})

module.exports = mongoose.model('product', productSchema)