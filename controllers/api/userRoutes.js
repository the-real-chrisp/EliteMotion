const router = require('express').Router();
const {User} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userValidEmail = await User.findOne({ where: { email: req.body.email } });

        if(!userValidEmail) {
            res.status(400).json({ message: 'Email or password invalid. Please try again.' })
            return;
        }

        const userValidPassword = await userValidEmail.checkPassword(req.body.password);

        if(!userValidPassword) {
            res.status(400).json({ message: 'Email or password invalid. Please try again.'})
        }
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/signup', async (req, res) => {
    try {
        const userAlreadyExists = await User.findOne({ where: { email: req.body.email } });

        if(userAlreadyExists) {
            res.status(400).json({ message: 'User already exists.' })
            return;
        }

        // handle successful signup

        const newUser = await User.create({
            name: req.body.email,
            email: req.body.email,
            password: req.body.password
        })
        res.json(newUser)

    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router