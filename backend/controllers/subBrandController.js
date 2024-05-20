const db = require('../models');

exports.createSubBrand = async (req, res) => {
  try {
    const { name } = req.body;

    const newSubBrand = await db.SubBrand.create({
      name
    });

    res.status(201).json({ message: 'Sub-brand created successfully', subBrand: newSubBrand });
  } catch (error) {
    console.error('Error creating sub-brand:', error);
    res.status(500).json({ message: 'Error creating sub-brand', error: error.message });
  }
};

exports.getSubBrands = async (req, res) => {
  try {
    const subBrands = await db.SubBrand.findAll();
    res.status(200).json(subBrands);
  } catch (error) {
    console.error('Error fetching sub-brands:', error);
    res.status(500).json({ message: 'Error fetching sub-brands', error: error.message });
  }
};

exports.getSubBrandById = async (req, res) => {
  try {
    const subBrandId = req.params.id;
    const subBrand = await db.SubBrand.findByPk(subBrandId);

    if (!subBrand) {
      return res.status(404).json({ message: 'Sub-brand not found' });
    }

    res.status(200).json(subBrand);
  } catch (error) {
    console.error('Error fetching sub-brand:', error);
    res.status(500).json({ message: 'Error fetching sub-brand', error: error.message });
  }
};

exports.updateSubBrand = async (req, res) => {
  try {
    const subBrandId = req.params.id;
    const { name } = req.body;

    const subBrand = await db.SubBrand.findByPk(subBrandId);

    if (!subBrand) {
      return res.status(404).json({ message: 'Sub-brand not found' });
    }

    subBrand.name = name;

    await subBrand.save();

    res.status(200).json({ message: 'Sub-brand updated successfully', subBrand });
  } catch (error) {
    console.error('Error updating sub-brand:', error);
    res.status(500).json({ message: 'Error updating sub-brand', error: error.message });
  }
};

exports.deleteSubBrand = async (req, res) => {
  try {
    const subBrandId = req.params.id;

    const subBrand = await db.SubBrand.findByPk(subBrandId);

    if (!subBrand) {
      return res.status(404).json({ message: 'Sub-brand not found' });
    }

    await subBrand.destroy();

    res.status(200).json({ message: 'Sub-brand deleted successfully' });
  } catch (error) {
    console.error('Error deleting sub-brand:', error);
    res.status(500).json({ message: 'Error deleting sub-brand', error: error.message });
  }
};
