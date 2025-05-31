const express = require("express")
const userModel = require('./models/User')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", // Update as per frontend origin
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("Hi, I am a Server")
})

app.post('/register', async (req, res) => {
    try {
        const { name, username, age, password, email, profilepic } = req.body
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'This Email is Already Registered' })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000)
        const user = await userModel.create({
            username, name, email, age, password: hash, otp, otpExpires
        })
        await sendOtp(email, otp)
        res.status(201).json({ message: 'OTP sent to email. Please Verify to complete registration' })
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({ message: 'Server Error', error })
    }
})

app.get('/getusers', async (req, res) => {
    try {
        const users = await userModel.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: 'Error Fetching Users', error })
    }
})

app.listen(3000)