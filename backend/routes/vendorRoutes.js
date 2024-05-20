const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authenticate = require('../middleware/authenticate');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/stats', authMiddleware, vendorController.getVendorStats);

module.exports = router;
