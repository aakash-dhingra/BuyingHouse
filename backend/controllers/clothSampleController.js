const db = require('../models');
const multer = require('multer');
const upload = multer();

exports.createClothSample = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { sample_reference_id, version, vendor_id, sub_brand_id, style, color, sample_quantity, season, quality_type } = req.body;
      const image = req.file ? req.file.buffer : null;

      const newClothSample = await db.ClothSample.create({
        sample_reference_id,
        version,
        vendor_id,
        sub_brand_id,
        style,
        color,
        sample_quantity,
        season,
        quality_type,
        upload_date: new Date(),
        image
      });

      res.status(201).json({ message: 'Cloth sample created successfully', clothSample: newClothSample });
    } catch (error) {
      console.error('Error creating cloth sample:', error);
      res.status(500).json({ message: 'Error creating cloth sample', error: error.message });
    }
  }
];

exports.getClothSamples = async (req, res) => {
  try {
    const clothSamples = await db.ClothSample.findAll({
      include: [
        { model: db.Vendor, attributes: ['name'] },
        { model: db.SubBrand, attributes: ['name'] }
      ]
    });
    res.status(200).json(clothSamples);
  } catch (error) {
    console.error('Error fetching cloth samples:', error);
    res.status(500).json({ message: 'Error fetching cloth samples', error: error.message });
  }
};
