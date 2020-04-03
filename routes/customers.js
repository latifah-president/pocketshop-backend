const express = require('express');
const customersController = require('../controllers/customers');
const vendorController = require('../controllers/vendors');
const router = express.Router();

router.get('/:firebase_id', customersController.getCustomerById);
router.post('/addtocart/:id', customersController.addToCart);
router.get('/cart/:id', customersController.getCartById);

// router.post('/register', usersController.addUser);

module.exports = router