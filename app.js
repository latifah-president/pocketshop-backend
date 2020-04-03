const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const userRoutes = require('./routes/users');
const vendorRoutes = require('./routes/vendors');
const customersRoutes = require('./routes/customers');
const stripeRoutes = require('./routes/stripe');
const productRoutes = require('./routes/products');

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'OPTIONS,GET,PUT,POST,DELETE')
    res.header("Access-Control-Allow-Origin: http://localhost:3000")

    next();
});

app.use('/user', userRoutes);
app.use('/vendor', vendorRoutes);
app.use('/customer', customersRoutes);
app.use('/stripe', stripeRoutes);
app.use('/product', productRoutes);


app.get('/', (req, res) => {
    res.send(`sanity check`)
});

module.exports = app