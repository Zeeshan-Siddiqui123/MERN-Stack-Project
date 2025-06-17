const express = require("express")
const userModel = require('./models/User')
const productModel = require('./models/Products')
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
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));


app.get("/", (req, res) => {
  res.send("Hi, I am a Server")
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
    console.log(user.json );
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

app.get('/getusers', async (req, res) => {
  try {
    const users = await userModel.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error Fetching Users', error })
  }
})

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

app.post('/products', upload.single('file'), async (req, res) => {
  try {
    const { title, price, description, category } = req.body
    const product = await productModel.create({
      title, price, description, category, file: req.file?.filename || ''
    })
    res.status(201).json({ message: 'Product registered successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server Error', error });
  }

})

app.get('/getproducts', async (req, res) => {
  try {
    const products = await productModel.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Error Fetching Products', error })
  }
})

app.get("/getproduct/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.json(product);
});

app.get('/products/category', async (req, res) => {
  try {
    const categoryName = req.query.name; // e.g., Male, Female, Couple
    const products = await productModel.find({ category: categoryName });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /product/update/:id
app.post('/product/update/:id', async (req, res) => {
  try {
    const { title, price, description, category } = req.body;

    const updated = await productModel.findByIdAndUpdate(
      req.params.id,
      { title, price, description, category },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Product not Updated' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/product/delete/:id', async (req, res) => {
  try {
    const deleted = await productModel.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Product not Deleted' });
    }
    res.status(201).json({ message: 'Product Deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
})

app.listen(3000)