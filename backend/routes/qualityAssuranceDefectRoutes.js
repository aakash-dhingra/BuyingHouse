const express = require('express');
const router = express.Router();
const qualityAssuranceDefectController = require('../controllers/qualityAssuranceDefectController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, qualityAssuranceDefectController.createQualityAssuranceDefect);
router.get('/', authenticate, qualityAssuranceDefectController.getQualityAssuranceDefects);

module.exports = router;
