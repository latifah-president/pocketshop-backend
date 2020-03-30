const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

router.get('/', usersController.getUsers);
// this route will handle the vendor and customer profile
router.get('/:firebase_id/:user_type', usersController.getUserById);
router.post('/register', usersController.addUser); //customer registration
router.put('/:id', usersController.updateUser); // update customer
router.delete('/:id', usersController.deleteUser); // 

module.exports = router