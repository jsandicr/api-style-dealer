const { purchaseModel } = require("../models/Purchase")
const Product = require("../database/Product")

const checkout = async(body) => {
    try{
        const { userEmail, amount, items } = body

        await items.forEach(async(item)=>{
            const { product } = item;

            const productInDatabase = await Product.getOneProduct(product._id)

            const newItem = {
                ...product,
                stockQuantity: productInDatabase.stockQuantity - item.quantity
            }

            await Product.updateProduct(product._id, newItem)
        })

        const newPurchase = new purchaseModel({
            userEmail,
            amount,
            items
        });
        await newPurchase.save();
        return newPurchase;
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    checkout
}