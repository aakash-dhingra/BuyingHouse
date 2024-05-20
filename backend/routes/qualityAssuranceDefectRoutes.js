const express = require('express');
const router = express.Router();
const qualityAssuranceDefectController = require('../controllers/qualityAssuranceDefectController');
const authenticate = require('../middleware/authenticate');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, qualityAssuranceDefectController.createQualityAssuranceDefect);
router.get('/', authMiddleware, qualityAssuranceDefectController.getQualityAssuranceDefects);

module.exports = router;
