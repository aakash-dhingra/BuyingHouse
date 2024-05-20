const express = require('express');
const router = express.Router();
const defectController = require('../controllers/defectController');
const authenticate = require('../middleware/authenticate');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, defectController.createDefect);
router.get('/', authMiddleware, defectController.getDefects);

module.exports = router;
