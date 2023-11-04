const express = require('express');
const router = express.Router();
const productController = require("../../controllers/productController")

router
    .get('/', productController.getAllProducts)
    .get('/:productId', productController.getOneProduct)
    .get('/query/:query', productController.getProductsByQuery)
    .post('/', productController.createProduct)
    .patch('/:productId', productController.updateProduct)
    .delete('/:productId', productController.deleteProduct)

module.exports = router;