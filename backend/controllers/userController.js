const db = require('../models');

// exports.register = async (req, res) => {
//   try {
//     const { username, password, role } = req.body;
//     const newUser = await db.User.create({ username, password, role });
//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// };

exports.register = async (req, res) => {
    const { username, password, role, vendorName } = req.body;
  
    try {
      const newUser = await db.User.create({ username, password, role });
  
      if (role === 'vendor' && vendorName) {
        const newVendor = await db.Vendor.create({
          name: vendorName,
          contact_info: `Vendor contact info for ${username}`
        });
        newUser.vendor_id = newVendor.vendor_id;
        await newUser.save();
      }
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  };

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username } });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    req.session.user = {
      user_id: user.user_id,
      username: user.username,
      role: user.role
    };

    res.status(200).json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};
