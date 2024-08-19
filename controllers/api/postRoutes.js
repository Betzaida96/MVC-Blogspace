const router = require('express').Router();
const { Post, Comment, User} = require('../../models');

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
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });

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
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: { id: req.params.id }
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