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

exports.getClothSamplesByVendor = async (req, res) => {
  try {
    const vendorId = req.query.vendor_id;

    const samples = await db.ClothSample.findAll({
      where: { vendor_id: vendorId },
      include: [db.Vendor, db.SubBrand]
    });

    res.status(200).json(samples);
  } catch (error) {
    console.error('Error fetching samples:', error);
    res.status(500).json({ message: 'Error fetching samples', error: error.message });
  }
};

// exports.getAllClothSamples = async (req, res) => {
//   try {
//       const { vendor_id } = req.query;

//       // Debugging output to check vendor_id received
//       console.log('Vendor ID:', vendor_id);

//       const queryOptions = {};

//       if (vendor_id) {
//           queryOptions.where = { vendor_id: vendor_id };
//       }

//       const clothSamples = await db.ClothSample.findAll(queryOptions);

//       // Debugging output to check cloth samples fetched
//       console.log('Cloth Samples:', clothSamples);

//       res.status(200).json(clothSamples);
//   } catch (error) {
//       console.error('Error fetching cloth samples:', error);
//       res.status(500).json({ message: 'Error fetching cloth samples', error: error.message });
//   }
// };

// exports.getAllClothSamples = async (req, res) => {
//   try {
//       const { status, reference_id } = req.query;
//       const queryOptions = {
//         include: [
//             {
//                 model: db.Vendor,
//                 attributes: ['name']
//             }
//         ],
//         order: [['version', 'DESC']]
//     };

//       if (status) {
//           queryOptions.where = { status: status };
//       }
//       if (reference_id) {
//           queryOptions.where = { ...queryOptions.where, sample_reference_id: reference_id };
//       }

//       const clothSamples = await db.ClothSample.findAll(queryOptions);
//       res.status(200).json(clothSamples);
//   } catch (error) {
//       console.error('Error fetching cloth samples:', error);
//       res.status(500).json({ message: 'Error fetching cloth samples', error: error.message });
//   }
// };
exports.getAllClothSamples = async (req, res) => {
  try {
      const { status, reference_id } = req.query;
      const queryOptions = {
          attributes: ['sample_reference_id', 'style', 'color', 'season', 'image', 'sample_quantity', 'quality_type', 'upload_date'],
          include: [
              {
                  model: db.Vendor,
                  attributes: ['name']
              },
              {
                  model: db.QualityAssurance,
                  attributes: ['checked_by'],
                  include: [
                      {
                          model: db.User,
                          as: 'checkedByUser',
                          attributes: ['username']
                      }
                  ]
              }
          ],
          order: [['version', 'DESC']]
      };

      if (status) {
          queryOptions.where = { status: status };
      }
      if (reference_id) {
          queryOptions.where = { ...queryOptions.where, sample_reference_id: reference_id };
      }

      const clothSamples = await db.ClothSample.findAll(queryOptions);
       // Convert BLOB data to base64
       clothSamples.forEach(sample => {
        if (sample.image) {
            sample.image = sample.image.toString('base64');
        }
    });
      res.status(200).json(clothSamples);
  } catch (error) {
      console.error('Error fetching cloth samples:', error);
      res.status(500).json({ message: 'Error fetching cloth samples', error: error.message });
  }
};

exports.getPendingClothSamples = async (req, res) => {
  try {
      const { status } = req.query;
      const queryOptions = {};

      if (status) {
          queryOptions.where = { status: status };
      }
      

      const clothSamples = await db.ClothSample.findAll(queryOptions);
      res.status(200).json(clothSamples);
  } catch (error) {
      console.error('Error fetching cloth samples:', error);
      res.status(500).json({ message: 'Error fetching cloth samples', error: error.message });
  }
};
