const mongoose = require("mongoose");
const { sizeScheme } = require("../schemas/SizeScheme");

const sizeModel = mongoose.model('Size', sizeScheme);

module.exports = {
    sizeModel
}