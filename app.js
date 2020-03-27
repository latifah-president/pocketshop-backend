const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const userRoutes = require('./routes/users');
const vendorRoutes = require('./routes/vendors');
const customersRoutes = require('./routes/customers');


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use('/users', userRoutes);
app.use('/vendor', vendorRoutes);
app.use('/customer', customersRoutes);



app.get('/', (req, res) => {
    res.send(`sanity check`)
});

module.exports = app