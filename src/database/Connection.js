const mongoose = require('mongoose');
require('dotenv').config()

function initConnection(){
    //const mongo_uri = process.env.mongo_uri || 'mongodb+srv://jsandicr16:gwYwNnehGuV6g1GP@cluster0.ewlnkax.mongodb.net/'
    const mongo_uri = process.env.mongo_uri
    console.log(mongo_uri)
    mongoose.connect(mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        }).then(() => {
        console.log('Conexión a MongoDB establecida');
        }).catch(err => {
        console.error('Error de conexión a MongoDB:', err);
    });
}

module.exports = {initConnection}