const express = require('express');
const productsController = require('../controllers/products');
const isAuthenticated = require('./../middleware/auth');
const router = express.Router();

router.get('/vendor/:vendor_id', productsController.getProductsByVendor);
router.post('/:vendor_id',  productsController.addProductByVendorId); 
router.put('/:id',  productsController.updateProductById);
router.delete('/:id',  productsController.deleteProductById);

module.exports = router;