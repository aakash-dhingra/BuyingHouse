const express = require('express');
const router = express.Router();
const qualityAssuranceController = require('../controllers/qualityAssuranceController');
const authenticate = require('../middleware/authenticate');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:sample_id/approve', authMiddleware, qualityAssuranceController.approveSample);
router.post('/:sample_id/reject', authMiddleware, qualityAssuranceController.rejectSample);
router.post('/update', authMiddleware, qualityAssuranceController.updateQualityAssurance);


module.exports = router;
