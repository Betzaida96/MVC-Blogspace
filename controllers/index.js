const router = require('express').Router();

// Import route files
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/PostRoutes');
const homePageRoutes = require('./api/homePageRoutes');
const dashboardRoutes = require('./api/dashboardRoutes');

// Setting up paths
router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/', homePageRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
