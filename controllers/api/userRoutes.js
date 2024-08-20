const router = require('express').Router();
const { User } = require('../../models');
const { body, validationResult } = require('express-validator');

// Get the signup page
router.get('/signup', (req, res) =>{
    res.render('signup');
})

// Create a new user and save session data for new user
router.post('/signup', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });        
    } catch (err) {
        console.error('Signup error:', err);
        res.status(400).json({ message: 'An error occurred during signup', error: err.message });
    }
});

// Authenticate user credentials and start a session
router.post('/login', [
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
],
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            return res.status(400).json({ message: 'Incorrect email or password, please try again' });  
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect email or password, please try again' });
        }

        req.session.save(() =>{
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
         });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'An error occured during login', error: err.message});
    }
});

// If a POST request is made to the /api/user/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Update an existing user
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (updated === 0) {
            return res.status(404).json({ message: 'No User found with this id' });
        }

        const user = await User.findByPk(req.params.id);

        res.status(200).json(user);

    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ message: 'An error occurred', error: err.message});
    }
});

module.exports = router;
