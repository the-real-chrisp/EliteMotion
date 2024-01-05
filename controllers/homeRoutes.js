const router = require('express').Router();
const { Workouts } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
    try {
        const workoutData = await Workout.findAll({
            include: [
                {
                    model: 'workout',
                    attribute: ['time', 'distance', 'date_created']
                }
            ]
        });

        const workouts = workoutData.map((workout) => project.get({ plain: true }));

        res.render('profile', {
            workouts,
            logged_in: req.session.logged_in
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

module.exports = router;