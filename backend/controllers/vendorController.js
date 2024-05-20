const db = require('../models');

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
