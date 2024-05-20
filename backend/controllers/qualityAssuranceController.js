const db = require('../models');
const QualityAssurance = db.QualityAssurance;

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