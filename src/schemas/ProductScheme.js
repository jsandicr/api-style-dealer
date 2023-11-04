const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    unique: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0
  },
  sizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Size'
      }
  ],
  brand: {
    type: String
  },
  discount: {
    type: Number,
    default: 0
  },
  ratings: {
    type: [
      {
        rating: Number,
        user: String
      }
    ]
  },
  labels: {
    type: [String]
  },
  promotion: {
    type: Boolean,
    default: false
  },
  additionalImages: {
    type: [String]
  },
  entryDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
    productSchema
}