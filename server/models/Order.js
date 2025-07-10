// models/Order.js
const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')


const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  product: String,
  amount: Number,
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema)
