const db = require('../models');

exports.getRejectionBySubBrand = async (req, res) => {
  try {
    const rejections = await db.ClothSample.findAll({
      where: { status: 'rejected' },
      attributes: [
        'sub_brand_id',
        [db.Sequelize.fn('COUNT', db.Sequelize.col('ClothSample.sample_id')), 'rejection_count']
      ],
      include: [{ model: db.SubBrand, attributes: ['name', 'sub_brand_id'] }],
      group: ['ClothSample.sub_brand_id', 'SubBrand.sub_brand_id', 'SubBrand.name']
    });
    res.status(200).json(rejections);
  } catch (error) {
    console.error('Error fetching rejection by sub-brand:', error);
    res.status(500).json({ message: 'Error fetching rejection by sub-brand', error: error.message });
  }
};

exports.getDefectsByVendor = async (req, res) => {
  try {
    const defects = await db.QualityAssuranceDefect.findAll({
      include: [
        {
          model: db.QualityAssurance,
          attributes: ['qa_id', 'sample_id'],
          include: [{
            model: db.ClothSample,
            attributes: ['sample_id', 'vendor_id'],
            include: [{ model: db.Vendor, attributes: ['name', 'vendor_id'] }]
          }]
        },
        { model: db.Defect, attributes: ['name', 'defect_id'] }
      ],
      attributes: [[db.Sequelize.fn('COUNT', db.Sequelize.col('QualityAssuranceDefect.defect_id')), 'defect_count']],
      group: [
        'QualityAssurance.qa_id',
        'QualityAssurance.sample_id',
        'QualityAssurance.ClothSample.sample_id',
        'QualityAssurance.ClothSample.vendor_id',
        'QualityAssurance.ClothSample.Vendor.vendor_id',
        'QualityAssurance.ClothSample.Vendor.name',
        'Defect.defect_id',
        'Defect.name'
      ]
    });
    res.status(200).json(defects);
  } catch (error) {
    console.error('Error fetching defects by vendor:', error);
    res.status(500).json({ message: 'Error fetching defects by vendor', error: error.message });
  }
};




exports.getAcceptanceByQualityType = async (req, res) => {
    try {
      const acceptance = await db.ClothSample.findAll({
        attributes: [
          'quality_type',
          [db.Sequelize.fn('COUNT', db.Sequelize.col('ClothSample.sample_id')), 'total_samples'],
          [db.Sequelize.fn('SUM', db.Sequelize.literal('CASE WHEN "ClothSample"."status" = \'approved\' THEN 1 ELSE 0 END')), 'accepted_samples']
        ],
        group: ['ClothSample.quality_type']
      });
      res.status(200).json(acceptance);
    } catch (error) {
      console.error('Error fetching acceptance by quality type:', error);
      res.status(500).json({ message: 'Error fetching acceptance by quality type', error: error.message });
    }
  };

  exports.getAcceptanceRejectionBySubBrand = async (req, res) => {
    try {
      const results = await db.ClothSample.findAll({
        attributes: [
          'sub_brand_id',
          [db.Sequelize.fn('SUM', db.Sequelize.literal('CASE WHEN "ClothSample"."status" = \'approved\' THEN 1 ELSE 0 END')), 'accepted_count'],
          [db.Sequelize.fn('SUM', db.Sequelize.literal('CASE WHEN "ClothSample"."status" = \'rejected\' THEN 1 ELSE 0 END')), 'rejected_count']
        ],
        include: [{ model: db.SubBrand, attributes: ['name', 'sub_brand_id'] }],
        group: ['ClothSample.sub_brand_id', 'SubBrand.sub_brand_id', 'SubBrand.name']
      });
      // Log the results for debugging
    console.log(results);
      res.status(200).json(results);
    } catch (error) {
      console.error('Error fetching acceptance and rejection by sub-brand:', error);
      res.status(500).json({ message: 'Error fetching acceptance and rejection by sub-brand', error: error.message });
    }
  };