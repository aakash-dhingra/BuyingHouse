// const express = require('express');
// const router = express.Router();
// const clothSampleController = require('../controllers/clothSampleController');
// const authenticate = require('../middleware/authenticate');



// router.post('/', authenticate,clothSampleController.createClothSample);
// router.get('/', authenticate,clothSampleController.getClothSamples);

// module.exports = router;

const express = require('express');
const router = express.Router();
const clothSampleController = require('../controllers/clothSampleController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, clothSampleController.createClothSample);
router.get('/', authMiddleware, clothSampleController.getClothSamples);
// Add other routes as needed

module.exports = router;
