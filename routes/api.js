// Express server
const express = require('express');
// Exporess router
const router = express.Router();

// Base controller for root, statistics and open information endpoints
const apiBase = require('../controllers/apiBaseController.js');

/* ROUTE ROOT: /api
 *
 *
 */

// GET /api - main api endpoint
router.get('/', apiBase.getRoot);
// GET /api/stats - get public api statistics
router.get('/stats', apiBase.getStats);

module.exports = router;