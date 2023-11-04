const purchaseService = require("../services/purchaseService")
const Product = require("../database/Product")

const checkout = async(req, res) => {
    try{
        const { body } = req;
        const { items } = body;

        if(!body.userEmail || !body.amount || !body.items)
        {
            res.status(400).send({ status: '400', message: 'Incomplete data' });
            return;    
        }

        if(body.items.length === 0)
        {
            res.status(400).send({ status: '400', message: 'No items' });
            return;    
        }

        for (const item of items){
            const productInDatabase = await Product.getOneProduct(item.product._id)
            if(item.quantity > productInDatabase.stockQuantity){
                return res.status(400).json({
                    status: '400',
                    message: 'Insufficient Quantity in Stock',
                    product: item.product
                });
            }
        }

        const checkout = purchaseService.checkout(body)
        
        res.status(201).json({ status: '200', message: checkout })
    }catch(err){
        res.status(500).json({ status: '500', message: 'Error while retrieving products' });
    }
};

module.exports = {
    checkout
}