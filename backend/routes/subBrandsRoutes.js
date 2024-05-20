

const express = require('express');
const router = express.Router();
const subBrandController = require('../controllers/subBrandController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new sub-brand
router.post('/', authMiddleware, subBrandController.createSubBrand);

// Get all sub-brands
router.get('/', authMiddleware, subBrandController.getSubBrands);

// Get a sub-brand by ID
router.get('/:id', authMiddleware, subBrandController.getSubBrandById);

// Update a sub-brand
router.put('/:id', authMiddleware, subBrandController.updateSubBrand);

// Delete a sub-brand
router.delete('/:id', authMiddleware, subBrandController.deleteSubBrand);

module.exports = router;
