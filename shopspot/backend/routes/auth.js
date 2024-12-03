const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Missing bcrypt import
const User = require('../models/User');  // Assuming this is the correct path
const authenticate = require('../middleware/auth');  // Import the authentication middleware

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error saving user', error: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

// Profile route (protected)
router.get('/profile', authenticate, async (req, res) => {
  try {
    const userId = req.user; // This is set by the authenticate middleware
    const user = await User.findById(userId).select('-password'); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return user data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
