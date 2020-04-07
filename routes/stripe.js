const stripeControllers = require('./../controllers/stripe');
const express = require('express');
const router = express.Router();

router.get('/authorize', stripeControllers.authorize); 
router.post('/token', stripeControllers.token);
router.get('/dashboard', stripeControllers.dashboard);
router.post('/payout', stripeControllers.payout);

module.exports = router;
