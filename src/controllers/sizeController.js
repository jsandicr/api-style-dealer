const sizeService = require("../services/sizeService")

const getAllSizes = async(req, res) => {
    try{
        const allSizes = await sizeService.getAllSizes()
        res.status(200).json({allSizes})
    }catch(err){
        res.status(404).json({ status: '404', message: 'Error while retrieving sizes' });
    }
};

const getOneSize = async(req, res) => {
    try {
        const size = await sizeService.getOneSize(req.params.sizeId)
        res.status(200).send({status: '200', size})
    }catch(err){
        res.status(404).send({ status: '404', message: 'Size Not Found' });
    }
};

const createSize = async(req, res) => {
    try{
        const { body } = req;
        
        if(!body.size || !body.available)
        {
            res.status(400).send({ status: '400', message: 'Incomplete data' });
            return;    
        }

        const newSize = {
            size: body.size,
            available: body.available
        }
        
        const createdSize = await sizeService.createSize(newSize)
        res.status(201).send({ status: "201", data: createdSize })
    }catch(err){
        res.status(500).send({ status: '500', message: 'Create Error' });
    }
};

const updateSize = async(req, res) => {
    try{
        const { body } = req;
        
        if(!body.size || !body.available)
        {
            res.status(400).send({ status: '400', message: 'Incomplete data' });
            return;    
        }

        const newSize = {
            size: body.size,
            available: body.available
        }

        const updatedSize = await sizeService.updateSize(req.params.sizeId, newSize)
        res.status(200).send({status: "OK", data: updatedSize})
    }catch(err){
        res.status(500).send({ status: '500', message: 'Updated Error' });
    }
};

const deleteSize = async(req, res) => {
    try {
        await sizeService.removeSize(req.params.sizeId);
        res.status(200).send({ status: "200",  message: 'Size deleted successfully' });
    } catch (error) {
        if (error.message === "Not Found") {
            res.status(404).send({ status: "404", message: error.message });
        } else {
            res.status(500).send({ status: "500", message: error.message });
        }
    }
};

module.exports = {
    getAllSizes,
    getOneSize,
    createSize,
    updateSize,
    deleteSize
}