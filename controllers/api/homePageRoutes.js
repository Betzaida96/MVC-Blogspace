const router = require('express').Router();
const { Post, User, Comment} = require('../../models');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text','post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get the login page, check to see if user is logged in, if not log them in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Get the signup page, if user is allready logged in, redirect to homepage
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

// Get a single post by id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });
        
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }

        const post = postData.get({ plain: true });

        res.render('single-post', {
            post,
            logged_in: req.session.logged_in
      });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;