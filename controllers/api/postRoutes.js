const router = require('express').Router();
const { Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: Comment }, { model: User }]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: Comment }, { model: User }]
        });

        if (!postData) {
            res.status(404).json({ message: 'No Post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(postData);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [updated] = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        }
    );

        if (updated === 0) {
            return res.status(404).json({ message: 'No Post found with this id'});
        }

        const post =  await Post.findByPk(req.params.id);

        res.status(200).json(post);

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'An error occured', error: err.message});
    }
});

// Delete a post by its id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if(!postData) {
            res.status(404).json({ message: 'No Post found with this id' });
            return;
        }
        res.status(200).json({ message: 'Post deleted successfully!' });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;