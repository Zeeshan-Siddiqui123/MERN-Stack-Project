const express = require("express")
const userModel = require('./models/User')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const path = require("path")
const upload = require("./config/multerconfig")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use("/images/uploads", express.static(path.join(__dirname, "public/images/uploads")));
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5175"],
  credentials: true
}));


app.get("/", (req, res) => {
    res.send("Hi, I am a Server")
})

app.get('/getusers', async (req, res) => {
    try {
        const users = await userModel.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: 'Error Fetching Users', error })
    }
})

app.post('/register', upload.single('file'), async (req, res) => {
    try {
        const { name, username, password, email } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'This Email is Already Registered' });
        }
        const existingUsername = await userModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'This Username is not available, please try another' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            username,
            name,
            email,
            file: req.file?.filename || '',
            password: hash
        });

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await userModel.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({ message: 'This Email is Not Registered' })
        }
        bcrypt.compare(password, existingUser.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email: existingUser.email, userid: existingUser._id }, 'key')
                res.cookie("token", token)
                res.status(201).json({ message: "You can login", token })
            } else {
                res.status(401).json({ message: "Incorrect email or password" })
            }
        })
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
})

app.listen(3000)