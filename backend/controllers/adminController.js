const db = require('../models');

exports.getPendingUsers = async (req, res) => {
    try {
        const pendingUsers = await db.User.findAll({ where: { approved: false } });
        res.status(200).json(pendingUsers);
    } catch (error) {
        console.error('Error fetching pending users:', error);
        res.status(500).json({ message: 'Error fetching pending users', error: error.message });
    }
};

exports.approveUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        const user = await db.User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.approved = true;
        await user.save();

        res.status(200).json({ message: 'User approved successfully' });
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({ message: 'Error approving user', error: error.message });
    }
};
