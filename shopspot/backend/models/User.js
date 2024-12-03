const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure the email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();  // Only hash if password is modified

  try {
    const salt = await bcrypt.genSalt(10);  // Generate salt
    this.password = await bcrypt.hash(this.password, salt);  // Hash password with salt
    next();  // Proceed to save user
  } catch (error) {
    next(error);  // Pass error to next middleware
  }
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
