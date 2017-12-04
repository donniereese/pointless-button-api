// express
const express = require('express');
// express Router
const router = express.Router();
// account controller
const account = require('../controllers/accountController.js');
// gatekeepers
const { requireUserAuth } = require('../services/papers.js');

// get the account of the current user who's signed in
router.get('/', account.getAuthorizedUserAccount);

// register an account
router.post('/register', account.registerNewAccount);

// request new api key for account
router.get('/createKey', requireUserAuth, account.createNewApiKey);

module.exports = router;
