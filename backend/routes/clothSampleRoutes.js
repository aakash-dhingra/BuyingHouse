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
router.get('/', authMiddleware, clothSampleController.getAllClothSamples);
router.get('/pending', authMiddleware, clothSampleController.getPendingClothSamples);
router.get('/rejected', authMiddleware, clothSampleController.getRejectedSamples);
router.get('/vendor', authMiddleware, clothSampleController.getClothSamplesByVendor); 
router.get('/reference/:reference_id', clothSampleController.getClothSampleByReferenceId);

//
// Add other routes as needed
// router.get('/vendor', authMiddleware, clothSampleController.getAllClothSamples);

module.exports = router;
