const express = require('express');
const vendorController = require('../controllers/vendors');
const router = express.Router();
const isAuthenticated = require('./../middleware/auth');

router.get('/:firebase_id',  vendorController.getVendorById); //vendor profile
router.put('/register',  vendorController.addVendor);
router.put('/:firebase_id',  vendorController.updateVendor);
router.delete('/:id', isAuthenticated, vendorController.deleteVendor);

module.exports = router