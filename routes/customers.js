const express = require('express');
const usersController = require('../controllers/users');
const vendorController = require('../controllers/vendors');
const router = express.Router();

// router.get('/:firebase_id', vendorController.getVendorById);
// router.post('/register', usersController.addUser);

module.exports = router