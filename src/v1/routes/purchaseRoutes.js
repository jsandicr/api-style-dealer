const express = require('express');
const router = express.Router();
const purchaseController = require("../../controllers/purchaseController")

router
    .post('/checkout', purchaseController.checkout)

module.exports = router;