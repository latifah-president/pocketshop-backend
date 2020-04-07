const express = require('express');
const vendorController = require('../controllers/vendors');
const router = express.Router();

router.get('/:firebase_id', vendorController.getVendorById); //vendor profile
router.post('/register', vendorController.addVendor);
router.put('/:firebase_id', vendorController.updateVendor);
router.delete('/:id', vendorController.deleteVendor);

module.exports = router