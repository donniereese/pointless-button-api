// Express server
const express = require('express');
// Exporess router
const router = express.Router();
// gatekeepers
const { requireUserAuth } = require('../services/papers.js');

/* Route Controllers */
// /api/switches/ -- Switches controllers
const switchesController = require('../controllers/switchesController.js');

router.get('/', requireUserAuth, switchesController.getSwitches);

module.exports = router;
