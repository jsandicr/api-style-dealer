const { sizeModel } = require("../models/Size")

const getAllSizes = async() => {
    const allSizes = await sizeModel.find();
    allSizes.sort((a, b) => {
        const sizeA = parseInt(a.size.match(/\d+/)[0]);
        const sizeB = parseInt(b.size.match(/\d+/)[0]);

        // Comparar los números
        if (sizeA < sizeB) {
            return -1;
        }
        if (sizeA > sizeB) {
            return 1;
        }
        return 0;
    })
    return allSizes;
}

const getOneSize = async(sizeId) => {
    const size = await sizeModel.findById(sizeId);
    return size;
}

const createSize = async(size) => {
    const newSize = new sizeModel(size);
    await newSize.save();
    return newSize;
}

const updateSize = async(sizeId, size) => {
    const updatedSize = await sizeModel.findOneAndUpdate({_id: sizeId}, size, { new: true })
    return updatedSize;
}

const removeSize = async (sizeId) => {
    const size = await sizeModel.findById(sizeId);

    if (!size) {
        throw new Error("Not Found");
    }

    await sizeModel.findByIdAndRemove(sizeId);
}

module.exports = {
    getAllSizes,
    getOneSize,
    createSize,
    updateSize,
    removeSize
}