const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const authenticate = require('./middleware/auth');
const User = require('./models/User'); 
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use('/api/auth', authRoutes);  
app.use('/api/blogs', authenticate, blogRoutes);


mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);  
  });



const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);


const cartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

let tshirts = [
  { id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxcMZzP5HtwxGtRx5r61UEyyUG22pJ-mGKg&s', price: 5.99 },
  { id: 2, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_XcBmyHa0urexsxBrISilsWu78STSOKMkFw&s', price: 2.00 },
  { id: 3, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlQHhgPC19MVWwtKcLDsBd5qFXIf5NzcgGYQ&s', price: 8.49 },
  { id: 4, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4qYvO1uUqzr8weYD1iGytNltGnEI1JDJpoQ&s', price: 3.30 },
  { id: 5, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnke5SH6liOCvvexDd1orKUwnpuQurM6lJXQ&s', price: 4.99 },
  { id: 6, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGYmAOAmZdwkhAvGmelaH8NZ6Ie46WfAGvOg&s', price: 6.80 },
  { id: 7, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRPdqgbphin_7L03gDVa2hmpLARwMxYD20Rg&s', price: 2.99 },
  { id:8 , src:'https://rethought.in/cdn/shop/files/Task-8678085-1-1_360x.png?v=1712140769', price: 2.99 },
  { id:9 , src:'https://rethought.in/cdn/shop/files/118-1-1_c75d82b0-b5da-44ff-9a41-f2079f989304_360x.png?v=1717151203', price: 3.99 },
  { id:10 , src:'https://rethought.in/cdn/shop/files/47-1-1_fda1d1f8-449c-4d4a-8ac9-489140ce0487_360x.png?v=1717758247', price: 4.99 }
];

let partyTops = [
  { id: 1, src: 'https://rethought.in/cdn/shop/files/5158-1-3.png?v=1717133275', price: 6.99 },
  { id: 2, src: 'https://rethought.in/cdn/shop/files/39-1-1_1.png?v=1725080299', price: 5.00 },
  { id: 3, src: 'https://rethought.in/cdn/shop/files/5168-1-3_360x.png?v=1717136648', price: 4.49 },
  { id: 4, src: 'https://rethought.in/cdn/shop/files/73-1-2_360x.png?v=1712569674', price: 7.30 },
  { id: 5, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdC6I8r33h1iU8pWT5SP6nyZYErxeXW1pE2Q&s', price: 3.99 },
  { id: 6, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuXuMYfDd_YJtyhlfvN4_xYkRTA42W2RJ3wQ&s', price: 4.80 },
  { id: 7, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXdSEZURwUNF4FWvu88O-hZYpwrRq7XWZJWA&s', price: 5.99 },
  { id: 8, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcTNGzHST_5e5z9I95T8bar3J2SRuRccHm2A&s', price: 4.99 },
  { id: 9, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhsjn8748MxN8SBVUwzYm7Y-S_vCwSgivBYQ&s', price: 3.99 },
  { id: 10, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0FBj1BLU7SkVgOZjq27k_YRiFPmH2zLQ0g&s', price: 2.99 }
];

let trousers = [
  { id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa90A-2EOKi6kWAmM0dcGz5U3EWWa6fGy3Qg&s', price: 2.99 },
  { id: 2, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb0x14jfZjiEDoTLim54cizH6UNQkVvzKaRA&s', price: 5.00 },
  { id: 3, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgbpRpxxb5-c5RdRaQZUHYIrCF01BA3enIgw&s', price: 4.49 },
  { id: 4, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBb8evw_3SJcB4Mh_kmiSMsbMsynEzW0uDNw&s', price: 1.30 },
  { id: 5, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmF3H438PN-fPJSNnaRyaFD_RolZdX8kOS9g&s', price: 2.99 },
  { id: 6, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLn9Itf7yUSr9rAicsy87i222sb3ZYF8Y1VQ&s', price: 2.50 },
  { id: 7, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs9evCjphY2A_zo05r6ZBymnbE5fOvlExKuA&s', price: 1.99 },
  { id: 8, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvWnJuBzAVOFoc1MPz7VJyoKZGr4SLAvb7Lg&s', price: 1.99 }
];

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


app.get('/api/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { username, email } = user;  // You can also return more data if needed
    res.json({ success: true, data: { username, email } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user profile', error: error.message });
  }
});

app.post('/api/products', async (req, res, next) => {
  try {
    const { name, price, description, category, imageUrl } = req.body;
    if (!name || !price || !description || !category || !imageUrl) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const product = new Product({ name, price, description, category, imageUrl });
    await product.save();
    res.status(201).json({ success: true, message: 'Product created', data: product });
  } catch (err) {
    next(err);
  }
});

app.get('/api/categories', async (req, res) => {
  try {

    const categories = await Product.distinct('category');
    if (categories.length === 0) {
      return res.status(404).json({ success: false, message: 'No categories found' });
    }
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Error fetching categories', error: error.message });
  }
});


app.get('/api/products/:category', async (req, res) => {
  const { category } = req.params;
  console.log(`Fetching products for category: ${category}`);  
  try {
    const products = await Product.find({ category });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: `No products found for category: ${category}` });
    }

    res.json(products);  
  } catch (error) {
    console.error('Error fetching products:', error); 
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});


app.post('/api/cart', async (req, res) => {
  const { sessionId, productId, quantity } = req.body;

  if (!sessionId || !productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ success: false, message: 'Invalid sessionId or productId' });
  }

  if (quantity <= 0) {
    return res.status(400).json({ success: false, message: 'Quantity must be greater than zero' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({ sessionId, products: [{ productId, quantity }] });
    } else {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();

    res.status(200).json({ success: true, message: 'Product added to cart', data: cart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ success: false, message: 'Error adding product to cart', error: error.message });
  }
});


app.put('/api/cart', async (req, res) => {
  const { sessionId, productId, quantity } = req.body;
  
  if (!sessionId || !mongoose.Types.ObjectId.isValid(productId) || quantity <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid sessionId, productId, or quantity' });
  }

  try {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    const product = cart.products.find((p) => p.productId.toString() === productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not in cart' });

    product.quantity = quantity;
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (err) {
    console.error('Error updating cart:', err);
    res.status(500).json({ success: false, message: 'Error updating cart', error: err.message });
  }
});


app.delete('/api/cart/:userId/:productId', async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    if (!isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: 'Invalid productId' });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    res.json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong. Please try again later.',
    error: err.message,
  });
});

app.get('/api/tshirts', (req, res) => {
  res.json(tshirts);
});

app.get('/api/tops', (req, res) => {
  res.json(partyTops);
});

app.get('/api/trousers', (req, res) => {
  res.json(trousers);
});



const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

app.get('/', (req, res) => {
  res.send('Backend is running!'); 
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
  
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message saved successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});


const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
