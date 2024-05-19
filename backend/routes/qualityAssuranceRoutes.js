const express = require('express');
const router = express.Router();
const qualityAssuranceController = require('../controllers/qualityAssuranceController');
const authenticate = require('../middleware/authenticate');

router.post('/:sample_id/approve', authenticate, qualityAssuranceController.approveSample);
router.post('/:sample_id/reject', authenticate, qualityAssuranceController.rejectSample);

module.exports = router;
