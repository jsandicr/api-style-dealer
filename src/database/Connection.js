const mongoose = require('mongoose');

function initConnection(){
    mongoose.connect('mongodb://localhost:27017/Style_Dealer', {
        useNewUrlParser: true,
        useUnifiedTopology: true
        }).then(() => {
        console.log('Conexión a MongoDB establecida');
        }).catch(err => {
        console.error('Error de conexión a MongoDB:', err);
    });
}

module.exports = {initConnection}