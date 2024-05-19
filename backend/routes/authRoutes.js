// // backend/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const db = require('../models');

// // Register route
// router.post('/register', async (req, res) => {
//   try {
//     const { username, password, role } = req.body;
//     const newUser = await db.User.create({ username, password, role });
//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await db.User.findOne({ where: { username } });
//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }
//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;
