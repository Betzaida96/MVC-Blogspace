const fs = require('fs');
const path = require('path');
const { User } = require('../models');

const seedUsers = async () => {
    const userData = JSON.parse(fs.readFileSync(path.join(__dirname, 'userSeedData.json'), 'utf8'));
    await User.sync({ force: true }); // Ensure the table is empty before seeding
    await User.bulkCreate(userData, { individualHooks: true }); // Hash passwords
    console.log('Users seeded');
};

seedUsers().catch(err => {
    console.error('Failed to seed users:', err);
});
