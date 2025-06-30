
const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')


const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      title: String,
      quantity: Number,
      price: Number,
    }
  ],
  totalAmount: Number,
  paymentMethod: String, // 'COD' or 'Online'
  transactionId: String, // If using online gateway
  status: {
    type: String,
    default: 'Pending', // 'Pending', 'Processing', 'Delivered', 'Cancelled'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Order', orderSchema)
