const express = require("express");
const router = express.Router();
const sizeController = require("../../controllers/sizeController")

router
    .get('/', sizeController.getAllSizes)
    .get('/:sizeId', sizeController.getOneSize)
    .post('/', sizeController.createSize)
    .patch('/:sizeId', sizeController.updateSize)
    .delete('/:sizeId', sizeController.deleteSize)

module.exports = router;