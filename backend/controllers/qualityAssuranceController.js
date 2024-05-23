const db = require('../models');
const QualityAssurance = db.QualityAssurance;
const { sequelize } = require('../models');

exports.approveSample = async (req, res) => {
  try {
    const { sample_id } = req.params;
    const qa = await db.QualityAssurance.create({ sample_id, status: 'approved' });
    res.status(201).json({ message: 'Sample approved successfully', qa });
  } catch (error) {
    res.status(500).json({ message: 'Error approving sample', error });
  }
};

exports.rejectSample = async (req, res) => {
  try {
    const { sample_id } = req.params;
    const { reason } = req.body;
    const qa = await db.QualityAssurance.create({ sample_id, status: 'rejected', reason });
    res.status(201).json({ message: 'Sample rejected successfully', qa });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting sample', error });
  }
};


exports.updateQualityAssurance = async (req, res) => {
  try {
    const { sample_id, status, rejection_reason, quality_type, defects } = req.body;

    // Check for required fields
    if (!sample_id || !status || !quality_type || (status === 'rejected' && (!rejection_reason || defects.length === 0))) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create or update the quality assurance record
    const qualityAssurance = await db.QualityAssurance.create({
      sample_id,
      status,
      rejection_reason,
      quality_type,
      checked_by: req.session.user.user_id,
      checked_date: new Date()
    });

  // Handle defects if the status is rejected
  if (status === 'rejected' && defects.length > 0) {
    const defectEntries = defects.map(defect_id => ({
      qa_id: qualityAssurance.qa_id,
      defect_id
    }));
    await db.QualityAssuranceDefect.bulkCreate(defectEntries);
  }

  // Update the ClothSample status if approved
  if (status === 'approved') {
    await db.ClothSample.update({ status: 'approved' }, { where: { sample_id } });
  }

  res.status(200).json({ message: 'Quality assurance updated successfully' });
} catch (error) {
  console.error('Error updating quality assurance:', error);
  res.status(500).json({ message: 'Error updating quality assurance', error: error.message });
}
};

exports.updateQualityAssurance = async (req, res) => {
  try {
      const { reference_id, quality_type, status, rejection_reason } = req.body;

      // Fetch the latest version sample with the given reference ID
      const latestSample = await db.ClothSample.findOne({
          where: { sample_reference_id: reference_id },
          order: [['version', 'DESC']]
      });

      if (latestSample) {
          const qaEntry = await db.QualityAssurance.create({
              sample_id: latestSample.sample_id,
              quality_type: quality_type,
              status: status,
              rejection_reason: rejection_reason,
              checked_by: req.session.user.user_id,
              checked_date: new Date()
          });

          latestSample.status = status;
          await latestSample.save();
          
  // Handle defects if the status is rejected
          if (status === 'rejected' && defects.length > 0) {
            const defectEntries = defects.map(defect_id => ({
              qa_id: qualityAssurance.qa_id,
              defect_id
            }));
            await db.QualityAssuranceDefect.bulkCreate(defectEntries);
          }
          res.status(200).json({ message: 'Quality assurance updated successfully', qaEntry });
      } else {
          res.status(404).json({ message: 'Sample not found' });
      }
  } catch (error) {
      console.error('Error updating quality assurance:', error);
      res.status(500).json({ message: 'Error updating quality assurance', error: error.message });
  }
};

exports.getVendorQualityStats = async (req, res) => {
  try {
      const query = `
          SELECT 
              v.name AS vendor_name,
              SUM(CASE WHEN cs.status = 'approved' THEN 1 ELSE 0 END) AS approved_count,
              SUM(CASE WHEN cs.status = 'rejected' THEN 1 ELSE 0 END) AS rejected_count
          FROM 
              "ClothSamples" cs
          JOIN 
              "Vendors" v ON cs.vendor_id = v.vendor_id
          GROUP BY 
              v.vendor_id, v.name
      `;

      const stats = await sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT
      });

      res.status(200).json(stats);
  } catch (error) {
      console.error('Error fetching vendor quality stats:', error);
      res.status(500).json({ message: 'Error fetching vendor quality stats', error: error.message });
  }
};

exports.getDefectsVendorWise = async (req, res) => {
  try {
      const query = `
          SELECT 
              d.name AS defect_name,
              COUNT(DISTINCT cs.sample_id) AS defect_count
          FROM 
              "QualityAssuranceDefects" qad
          JOIN 
              "QualityAssurances" qa ON qad.qa_id = qa.qa_id
          JOIN 
              "ClothSamples" cs ON qa.sample_id = cs.sample_id
          JOIN 
              "Defects" d ON qad.defect_id = d.defect_id
          GROUP BY 
              d.name
          ORDER BY 
              defect_count DESC
      `;

      const defectData = await sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT
      });

      res.status(200).json(defectData);
  } catch (error) {
      console.error('Error fetching defect data vendor-wise:', error);
      res.status(500).json({ message: 'Error fetching defect data vendor-wise', error: error.message });
  }
};

exports.getApprovalRejectionStats = async (req, res) => {
  try {
      const query = `
          SELECT 
              status,
              COUNT(*) AS count
          FROM 
              "ClothSamples"
          WHERE
              status IN ('approved', 'rejected')
          GROUP BY 
              status
      `;

      const stats = await sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT
      });

      res.status(200).json(stats);
  } catch (error) {
      console.error('Error fetching approval and rejection stats:', error);
      res.status(500).json({ message: 'Error fetching approval and rejection stats', error: error.message });
  }
};
