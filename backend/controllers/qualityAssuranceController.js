const db = require('../models');
const QualityAssurance = db.QualityAssurance;

exports.approveSample = async (req, res) => {
  try {
    const { sample_id } = req.params;
    const qa = await QualityAssurance.create({ sample_id, status: 'approved' });
    res.status(201).json({ message: 'Sample approved successfully', qa });
  } catch (error) {
    res.status(500).json({ message: 'Error approving sample', error });
  }
};

exports.rejectSample = async (req, res) => {
  try {
    const { sample_id } = req.params;
    const { reason } = req.body;
    const qa = await QualityAssurance.create({ sample_id, status: 'rejected', reason });
    res.status(201).json({ message: 'Sample rejected successfully', qa });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting sample', error });
  }
};
