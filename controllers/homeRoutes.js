const router = require('express').Router();
const { Workout, User } = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('homepage')
})

router.get('/profile', auth, async (req, res) => {
    try {
        const profileData = await User.findByPk({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: 'user',
                    attribute: ['name', 'goal']
                }
            ]
        });

        const profiles = profileData.map((profile) => profile.get({ plain: true }))

        const workoutData = await Workout.findAll({
            include: [
                {
                    model: 'workout',
                    attribute: ['time', 'distance', 'date_created']
                }
            ]
        });

        const workouts = workoutData.map((workout) => workout.get({ plain: true }));

        res.render('profile', {
            profiles,
            workouts,
            user_id: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
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

module.exports = router;