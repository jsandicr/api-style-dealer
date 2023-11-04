const express = require('express');
const cors = require('cors');
const v1ProductRouter = require('./src/v1/routes/productRoutes');
const v1SizeRouter = require('./src/v1/routes/sizeRoutes');
const v1Purchase = require('./src/v1/routes/purchaseRoutes')
const { initConnection } = require('./src/database/Connection')

const app = express();

initConnection() 

app.use(cors())
app.use(express.json());
app.use('/api/v1/products', v1ProductRouter);
app.use('/api/v1/sizes', v1SizeRouter);
app.use('/api/v1/purchase', v1Purchase)

module.exports = app;