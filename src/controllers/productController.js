const productService = require("../services/productService")
const mongoose = require('mongoose');
const SKUId = mongoose.Types.ObjectId;

const getAllProducts = async(req, res) => {
    try{
        const filters = req.query;
        let allProducts = null
        if(Object.keys(filters).length > 0){
            allProducts = await productService.getFilteredProducts(filters)    
        }else{
            allProducts = await productService.getAllProducts()
        }
        res.status(200).json({allProducts})
    }catch(err){
        res.status(404).json({ status: '404', message: 'Error while retrieving products' });
    }
};

const getProductsByQuery = async(req, res) => {
    try{
        const query = req.params.query;
        const products = await productService.getProductsByQuery(query)    
        res.status(200).json({products})
    }catch(err){
        res.status(404).json({ status: '404', message: 'Error while retrieving products'+err });
    }
};

const getOneProduct = async(req, res) => {
    try {
        const product = await productService.getOneProduct(req.params.productId)
        res.status(200).send({status: '200', product})
    }catch(err){
        res.status(404).send({ status: '404', message: 'Product Not Found' });
    }
};

const createProduct = async(req, res) => {
    try{
        const { body } = req;
        
        if (!body.title || !body.category || !body.price || !body.img || !body.color || !body.description || body.stockQuantity === undefined || !body.sizes || !body.brand || body.discount === undefined) {
            res.status(400).send({ status: '400', message: 'Incomplete data' });
            return;
        }

        const newProduct = {
            title: body.title,
            category: body.category,
            price: body.price,
            img: body.img,
            color: body.color,
            description: body.description,
            sku: new SKUId(),
            stockQuantity: body.stockQuantity,
            sizes: body.sizes,
            brand: body.brand,
            discount: body.discount
        };
        
        const createdProduct = await productService.createProduct(newProduct)
        res.status(201).send({ status: "201", data: createdProduct })
    }catch(err){
        console.log(err)
        res.status(500).send({ status: '500', message: 'Create Error' });
    }
};

const updateProduct = async(req, res) => {
    try{
        const { body } = req;
        
        if(!body.title || !body.category || !body.price || !body.img) return;
        
        const newProduct = {
            title: body.title,
            category: body.category,
            price: body.price,
            img: body.img
        }

        const updatedProduct = await productService.updateProduct(req.params.productId, newProduct)
        res.status(200).send({status: "OK", data: updatedProduct})
    }catch(err){
        res.status(500).send({ status: '500', message: 'Updated Error' });
    }
};

const deleteProduct = async(req, res) => {
    try {
        await productService.deleteProduct(req.params.productId);
        res.status(200).send({ status: "200",  message: 'Product deleted successfully' });
    } catch (error) {
        if (error.message === "Product Not Found") {
            res.status(404).send({ status: "404", message: error.message });
        } else {
            res.status(500).send({ status: "500", message: error.message });
        }
    }
};

module.exports = {
    getAllProducts,
    getProductsByQuery,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}