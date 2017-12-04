// Express server
const express = require('express');
// Exporess router
const router = express.Router();
// gatekeeper
const { requireAdmin, requireResourceOwner, requireAdminOrResourceOwner } = require('../services/papers.js');
// users controller
const users = require('../controllers/usersController.js');

/* Route Controllers */
// /api/users/ -- Users controller
const usersController = require('../controllers/usersController.js');

// router.use('/', requireAdmin);
router.get('/', requireAdmin, users.getUsersList);

// router.use('/:userId', requireAdminOrResourceOwner)
    // .use(requireAdminOrResourceOwner)(
router.get('/:userId', requireAdminOrResourceOwner, users.getUserById);

// router.route('/users/:userId/Public')
    // .use(requirePublicResource)
router.get('/:userId/Public', users.getUserById);

module.exports = router;
