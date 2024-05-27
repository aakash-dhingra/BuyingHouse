const express = require('express');
const router = express.Router();
const qaDashboardController = require('../controllers/qaDashboardController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/rejection-by-sub-brand', authMiddleware, qaDashboardController.getRejectionBySubBrand);
router.get('/defects-by-vendor', authMiddleware, qaDashboardController.getDefectsByVendor);
router.get('/acceptance-by-quality-type', authMiddleware, qaDashboardController.getAcceptanceByQualityType);
router.get('/acceptance-rejection-by-sub-brand', authMiddleware, qaDashboardController.getAcceptanceRejectionBySubBrand);

module.exports = router;
