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
<<<<<<< Updated upstream
        const profileData = await User.findByPk(1);
        const profiles = profileData.get({ plain: true })

        const workoutData = await Workout.findAll();
        console.log(workoutData)

        const workouts = workoutData.map((workout) => workout.get({ plain: true }));
        console.log(workoutData)
        res.render('profile');
=======
        const profileData = await User.findByPk(req.session.user_id, {
            include: [{
                model: Workout,
                attributes: ['name', 'time', 'distance']
            }]
        });
        // console.log("\nProfile data:", profileData, "\n")
        const profileWithWorkouts = profileData.get({ plain: true })
        // console.log("\nProfile with workouts:", profileWithWorkouts, "\n")

        res.render('profile', profileWithWorkouts);
>>>>>>> Stashed changes
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;