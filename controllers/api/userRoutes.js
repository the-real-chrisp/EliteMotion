const router = require('express').Router();
const {User} = require('../../models');

router.get('/users', (req, res) => {
    try {
        const allUsers = User.findAll({});
        console.log(JSON.stringify(allUsers));
        res.send(allUsers);
    } catch (err){
        res.status(400).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        console.log(userData)

        if(!userData) {
            res.status(400).json({ message: 'Email or password invalid. Please try again.' })
            return;
        }

        const userValidPassword = await userData.checkPassword(req.body.password);

        if(!userValidPassword) {
            res.status(400).json({ message: 'Email or password invalid. Please try again.'})
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
          });
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

router.post('/signup', async (req, res) => {
    try {
        const userAlreadyExists = await User.findOne({ where: { email: req.body.email } });

        if(userAlreadyExists) {
            res.status(400).json({ message: 'User already exists.' })
            return;
        }

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            goal: req.body.goal
        });
        res.json(newUser)
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router