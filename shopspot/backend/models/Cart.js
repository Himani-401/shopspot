const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    products: {
      type: [
        {
          productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true 
          },
          quantity: { 
            type: Number, 
            required: true, 
            min: [1, 'Quantity must be at least 1'] 
          }
        }
      ],
      validate: {
        validator: function (products) {
          return products.length > 0;
        },
        message: 'Cart must contain at least one product'
      }
    }
  },
  { timestamps: true }
);

// Populate products' details on query
CartSchema.pre('find', function() {
  this.populate('products.productId'); // Populating the productId field in the products array
});

CartSchema.pre('findOne', function() {
  this.populate('products.productId'); // Same for findOne
});

// Use `populate` in your queries if you need product details
CartSchema.methods.populateCart = function() {
  return this.populate('products.productId').execPopulate();
};

module.exports = mongoose.model('Cart', CartSchema);
