const db = require('../models');
const bcrypt = require('bcrypt');

async function createAdminUser() {
    const username = 'admin';
    const password = 'admin';
    const role = 'admin';

    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        await db.User.create({
            username,
            password: password,
            role,
            approved: true  // Admin user is already approved
        });

        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

createAdminUser();
