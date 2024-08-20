const router = require('express').Router();
const { Post, User} = require('../../models');
const withAuth = require('../../utils/auth');

// get the dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {user_id: req.session.user_id},
            include: [{ model: User, attributes: ['username'] }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
            stylesheet: '/css/dashboard.css',
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new blog post
router.post('/new', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update an existing blog post
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!updatedPost[0]) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a blog post
router.delete('/delete/:id', withAuth, async (req, res) =>{
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json({ message: 'Post deleted successfully!'});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;