const db = require('../models');
const QualityAssuranceDefect = db.QualityAssuranceDefect;

exports.createQualityAssuranceDefect = async (req, res) => {
  try {
    const { qa_id, defect_id } = req.body;
    const qad = await QualityAssuranceDefect.create({ qa_id, defect_id });
    res.status(201).json({ message: 'Quality Assurance Defect created successfully', qad });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Quality Assurance Defect', error });
  }
};

exports.getQualityAssuranceDefects = async (req, res) => {
  try {
    const qualityAssuranceDefects = await QualityAssuranceDefect.findAll();
    res.status(200).json(qualityAssuranceDefects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Quality Assurance Defects', error });
  }
};
