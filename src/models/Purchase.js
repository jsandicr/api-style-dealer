const mongoose = require('mongoose');
const { purchaseScheme } = require('../schemas/PurchaseScheme');

const purchaseModel = mongoose.model('Purchase', purchaseScheme);

module.exports = {
  purchaseModel
};