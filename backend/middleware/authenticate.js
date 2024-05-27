const db = require('../models');

exports.authenticateAdmin = async (req, res, next) => {
  if (req.session && req.session.user) {
  console.log(req.session.user['user_id']);
    const user = await db.User.findByPk(req.session.user.user_id);
    console.log("User::", user);
    if (user && user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }}else{
      console.log("Session or user not defined");
    }
};
