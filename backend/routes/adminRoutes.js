const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/authenticate');

router.get('/pending-users', authenticateAdmin, adminController.getPendingUsers);
router.post('/approve-user/:user_id', authenticateAdmin, adminController.approveUser);

module.exports = router;
