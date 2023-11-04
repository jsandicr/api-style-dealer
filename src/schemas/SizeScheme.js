const mongoose = require('mongoose')

const sizeScheme = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
})
    
module.exports = {
    sizeScheme
}