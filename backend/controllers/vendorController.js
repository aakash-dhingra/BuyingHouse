const db = require('../models');
const { sequelize } = require('../models');


exports.getVendorStats = async (req, res) => {
  try {
    const vendorId = req.session.user.user_id;

    const acceptedSamples = await db.ClothSample.count({
      where: { vendor_id: vendorId, status: 'approved' }
    });

    const rejectedSamples = await db.ClothSample.count({
      where: { vendor_id: vendorId, status: 'rejected' }
    });

    res.status(200).json({ acceptedSamples, rejectedSamples });
  } catch (error) {
    console.error('Error fetching vendor stats:', error);
    res.status(500).json({ message: 'Error fetching vendor stats', error: error.message });
  }
};


exports.getVendorDefectStats = async (req, res) => {
  try {
      const vendorId = req.session.user.user_id;

      const query = `
          SELECT 
              d.name AS defect_name,
              COUNT(*) AS count
          FROM 
              "QualityAssuranceDefects" qad
          JOIN 
              "QualityAssurances" qa ON qad.qa_id = qa.qa_id
          JOIN 
              "Defects" d ON qad.defect_id = d.defect_id
          JOIN 
              "ClothSamples" cs ON qa.sample_id = cs.sample_id
          WHERE
              cs.vendor_id = :vendorId
          GROUP BY 
              d.name
          ORDER BY 
              count DESC
      `;

      const stats = await sequelize.query(query, {
          replacements: { vendorId },
          type: sequelize.QueryTypes.SELECT
      });

      res.status(200).json(stats);
  } catch (error) {
      console.error('Error fetching vendor defect stats:', error);
      res.status(500).json({ message: 'Error fetching vendor defect stats', error: error.message });
  }
};