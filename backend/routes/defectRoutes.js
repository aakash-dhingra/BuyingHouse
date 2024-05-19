const express = require('express');
const router = express.Router();
const defectController = require('../controllers/defectController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, defectController.createDefect);
router.get('/', authenticate, defectController.getDefects);

module.exports = router;
