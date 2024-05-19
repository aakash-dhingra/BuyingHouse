const db = require('../models');
const Defect = db.Defect;

exports.createDefect = async (req, res) => {
  try {
    const { name } = req.body;
    const defect = await Defect.create({ name });
    res.status(201).json({ message: 'Defect created successfully', defect });
  } catch (error) {
    res.status(500).json({ message: 'Error creating defect', error });
  }
};

exports.getDefects = async (req, res) => {
  try {
    const defects = await Defect.findAll();
    res.status(200).json(defects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching defects', error });
  }
};
