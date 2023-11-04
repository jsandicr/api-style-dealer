const mongoose = require('mongoose');
const { productSchema } = require('../schemas/ProductScheme');

const productModel = mongoose.model('Product', productSchema);

module.exports = {
  productModel
};