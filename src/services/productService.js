const Product = require("../database/Product")

const getAllProducts = async() => {
    const allProducts = await Product.getAllProducts();
    return allProducts;
}

const getFilteredProducts = async(filters) => {
    const allProducts = await Product.getFilteredProducts(filters);
    return allProducts;
}

const getProductsByQuery = async(query) => {
    const products = await Product.getProductsByQuery(query);
    return products;
}

const getOneProduct = async(productId) => {
    const product = await Product.getOneProduct(productId);
    return product;
}
const createProduct = async(product) => {
    const createdProduct = await Product.createProduct(product)
    return createdProduct;
}
const updateProduct = async(productId, product) => {
    const updatedProduct = await Product.updateProduct(productId, product)
    return updatedProduct;
}
const deleteProduct = async(productId) => {
    await Product.removeProduct(productId);
}

module.exports = {
    getAllProducts,
    getFilteredProducts,
    getProductsByQuery,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}