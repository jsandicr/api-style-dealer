const mongoose = require('mongoose')

const purchaseScheme = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    items: {
        type: [{}],
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
})
    
module.exports = {
    purchaseScheme
}