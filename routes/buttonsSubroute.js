// Express server
const express = require('express');
// Exporess router
const router = express.Router();
// gatekeepers
const { requireUserAuth } = require('../services/papers.js');

/* Route Controllers */
// /api/buttons/ -- Buttons controllers
const buttonsController = require('../controllers/buttonsController.js');

router.get('/', requireUserAuth, buttonsController.getButtons);

router.post('/create', requireUserAuth, buttonsController.createButton);

router.post('/:buttonId', requireUserAuth, buttonsController.triggerButtonById);

router.post('/:buttonId/public', buttonsController.triggerButtonById);

router.delete('/:buttonId', requireUserAuth, buttonsController.removeButtonById);

module.exports = router;
