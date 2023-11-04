const Size = require("../database/Size")

const getAllSizes = async() => {
    const allSizes = await Size.getAllSizes();
    return allSizes;
}

const getOneSize = async(sizeId) => {
    const size = await Size.getOneSize(sizeId);
    return size;
}

const createSize = async(size) => {
    const sizeCreated = await Size.createSize(size);
    return sizeCreated;
}

const updateSize = async(sizeId, size) => {
    const updatedSize = await Size.updateSize(sizeId);
    return updatedSize;
}

const removeSize = async(sizeId) => {
    const removeSize = await Size.removeSize(sizeId);
    return removeSize;
}

module.exports = {
    getAllSizes,
    getOneSize,
    createSize,
    updateSize,
    removeSize
}