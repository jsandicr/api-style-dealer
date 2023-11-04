const Purchase = require("../database/Purchase")

const checkout = async(body) => {
    const checkout = await Purchase.checkout(body);
    return checkout;
}

module.exports = {
    checkout
}