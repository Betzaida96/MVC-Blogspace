const fs = require('fs');
const path = require('path');
const { Post } = require('../models');

const seedPosts = async () => {
    const postData = JSON.parse(fs.readFileSync(path.join(__dirname, 'postSeedData.json'), 'utf8'));
    await Post.sync({ force: true }); // Ensure the table is empty before seeding
    await Post.bulkCreate(postData);
    console.log('Posts seeded');
};

seedPosts().catch(err => {
    console.error('Failed to seed posts:', err);
});
