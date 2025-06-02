const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    profilepic: {
        type: String,
        default: 'default.png'
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

module.exports = mongoose.model('user', userSchema)