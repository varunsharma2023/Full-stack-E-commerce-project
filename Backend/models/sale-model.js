const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: [true, 'Please provide product name'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please Enter quantity'],
  },
  amount: {
    type: Number,
    required: [true, 'amount is required. Please provide amount'],
  },
}, {
  timestamps: true, // Add timestamps option
});

mongoose.model('Sale', postSchema);