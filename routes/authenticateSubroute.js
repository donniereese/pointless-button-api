// Express server
const express = require('express');
// Exporess router
const router = express.Router();
// gatekeeper
const { requireApiSignin, requireUserSignin } = require('../services/papers.js');
// authenticate controller
const authenticate = require('../controllers/authenticateController.js');

// router.use('/', requireAdmin);
// router.get('/', requireAdmin, users.getUsersList);

// Login from the web with email & password
router.post('/login', requireUserSignin, authenticate.userAccountLogin);

// Login for the api with apiKey & token
router.post('/key', requireApiSignin, authenticate.apiKey);

module.exports = router;
