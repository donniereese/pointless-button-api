// Express server
const express = require('express');
// Exporess router
const router = express.Router();

/* Route subRoutes */
// /api/users -- users
const usersSubroute = require('./usersSubroute.js');
// /api/switches -- switches
const switchesSubroute = require('./switchesSubroute.js');
// /api/buttons -- buttons
const buttonsSubroute = require('./buttonsSubroute.js');
// /api/authenticate -- authorization for different sources
const authenticateSubroute = require('./authenticateSubroute.js');
// /api/account -- account management subroute
const accountSubroute = require('./accountSubroute.js');

/* Route Controllers */
// /api -- Base controller for root, statistics and open information endpoints
const apiBase = require('../controllers/apiBaseController.js');

/* ROUTE ROOT: /api
 *
 *
 */

// GET /api - main api endpoint
router.get('/', apiBase.getRoot);
// GET /api/stats - get public api statistics
router.get('/stats', apiBase.getStats);

// Users
router.use('/users', usersSubroute);
// Switches
router.use('/switches', switchesSubroute);
// Buttons
router.use('/buttons', buttonsSubroute);
// authenticate endpoints
router.use('/authenticate', authenticateSubroute);
// Account endpoints
router.use('/account', accountSubroute);

module.exports = router;
