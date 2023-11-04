const { productModel } = require("../models/Product");

const getAllProducts = async () => {
    const allProducts = (await productModel.find()).slice(0, 10);
    return allProducts;
}

const getFilteredProducts = async (filters) => {
    const filtersToApply = {};
    
    if(filters.gender) {
        const genderRegex = new RegExp(`^.* - ${filters.gender}$`);
        filtersToApply.category = genderRegex;
    }
    if(filters.discount) {
        filtersToApply.discount = {}

        if (filters.discount === "Offers") {
            filtersToApply.discount.$gte = 1;
        } else {
            const discountValue = parseFloat(filters.discount.split(" ")[2].substring(1, 3));
            filtersToApply.discount.$gte = discountValue;
        }
    }
    if(filters.price) {
        filtersToApply.price = {}

        const priceParts = filters.price.split(" ")
        const pricePattern = /€(\d+)\+$/; // Expresión regular para buscar €number+
        const match = filters.price.match(pricePattern);
        if (match) {
            const priceValue = parseFloat(match[1]);
            if (!isNaN(priceValue)) {
                filtersToApply.price.$gte = priceValue;
            }
        }else{
            const priceGte = parseFloat(priceParts[0].replace(/^[^\d]+/, ''));
            const priceLte = parseFloat(priceParts[2].replace(/^[^\d]+/, ''));
            filtersToApply.price.$gte = priceGte
            filtersToApply.price.$lte = priceLte
        }
    }
    if(filters.size) {
        filtersToApply.size = filters.size
    }
    if(filters.orderBy){
        filtersToApply.orderBy = filters.orderBy
    }
    const allProducts = (await productModel.find(filtersToApply)).slice(0, 5);
    return allProducts;
}

const getProductsByQuery = async (query) => {
   
    const regex = new RegExp(`^${query}`, "i");
    const queryConditions = {
        $or: [
            { title: { $regex: regex } },
            { category: { $regex: regex } },
            { description: { $regex: regex } },
            { brand: { $regex: regex } }
        ]
    };

    const allProducts = (await productModel.find(queryConditions)).slice(0, 5);
    return allProducts;
}

const getOneProduct = async (productId) => {
    const product = await productModel.findById(productId);
    return product;
}

const createProduct = async (product) => {
    const newProduct = new productModel(product);
    await newProduct.save();
    return newProduct;
}

const updateProduct = async (productId, product) => {
    const updatedProduct = await productModel.findOneAndUpdate({_id: productId}, product, { new: true })
    return updatedProduct;
}

const removeProduct = async (productId) => {
    const product = await productModel.findById(productId);

    if (!product) {
        throw new Error("Product Not Found");
    }

    await productModel.findByIdAndRemove(productId);
}

module.exports = {
    getAllProducts,
    getFilteredProducts,
    getProductsByQuery,
    getOneProduct,
    createProduct,
    updateProduct,
    removeProduct
}