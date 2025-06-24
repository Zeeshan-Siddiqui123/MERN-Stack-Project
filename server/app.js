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
const Order = require("./models/Order")
const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use("/images/uploads", express.static(path.join(__dirname, "public/images/uploads")));
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}))

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
    console.log(user.json);
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

app.get('/api/profile/:userId', async (req, res) => {
  const user = await userModel.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({
    user: {
      name: user.name,
      image: `http://localhost:3000/images/uploads/${user.file}`
    }
  });
});

app.post('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = req.body.cart;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.cart = cart;
    await user.save();
    res.status(200).json({ message: 'Cart saved successfully' });
  } catch (err) {
    console.error('Save cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/cart/:userId', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ cart: user.cart || [] });
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/cart/:userId', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.cart = []; 
    await user.save();
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (err) {
    console.error('Clear cart error:', err);
    res.status(500).json({ message: 'Server error' });
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
        res.status(201).json({ message: "You can login", token, userId: existingUser._id })
      } else {
        res.status(401).json({ message: "Incorrect email or password" })
      }
    })
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('token'); 
  res.status(200).json({ message: 'Logged out successfully' });
});

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
    const categoryName = req.query.name; 
    const products = await productModel.find({ category: categoryName });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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

app.get('/related/:category/:productId', async (req, res) => {
  const { category, productId } = req.params;
  try {
    const relatedProducts = await productModel.find({
      category: category,
      _id: { $ne: new mongoose.Types.ObjectId(productId) }
    }).limit(4);
    res.json(relatedProducts);
  } catch (err) {
    console.error("Error in /related route:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(3000)