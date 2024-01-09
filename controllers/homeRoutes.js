const router = require('express').Router();
const { Workout, User } = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('homepage')
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return
    }

    res.render('login')
});

router.get('/signup', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return
    }

    res.render('signup')
});

router.get('/profile', async (req, res) => {
    try {
        const profileData = await User.findByPk(1);
        const profiles = profileData.get({ plain: true })

        const workoutData = await Workout.findAll();
        console.log(workoutData)

        const workouts = workoutData.map((workout) => workout.get({ plain: true }));
        console.log(workoutData)
        res.render('profile');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;