const db = require('../models');

exports.createClothSample = async (req, res) => {
  try {
    const { sample_reference_id, version, vendor_id, sub_brand_id, upload_date, image, status, style, color, sample_quantity, season } = req.body;

    // Log the incoming data
    console.log('Incoming data:', req.body);
    
    const newClothSample = await db.ClothSample.create({
      sample_reference_id,
      version,
      vendor_id,
      sub_brand_id,
      upload_date: upload_date || new Date(), // Default to current date if not provided
      image, // Ensure this is handled properly (e.g., as a buffer)
      status: status || 'pending', // Default to 'pending' if not provided
      style,
      color,
      sample_quantity,
      season
    });

    res.status(201).json({ message: 'Cloth sample created successfully', clothSample: newClothSample });
  } catch (error) {
    console.error('Error creating cloth sample:', error);
    res.status(500).json({ message: 'Error creating cloth sample', error });
  }
};


exports.getClothSamples = async (req, res) => {
  try {
    const clothSamples = await db.ClothSample.findAll();
    res.status(200).json(clothSamples);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cloth samples', error });
  }
};
