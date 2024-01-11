const router = require('express').Router();
const { Workout, User } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile')
    }
    res.render('homepage')
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return
    }

    res.render('login')
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return
    }

    res.render('signup')
});

router.get('/profile', async (req, res) => {
    try {

//         const profileData = await User.findByPk(1);
//         const profiles = profileData.get({ plain: true })

//         const workoutData = await Workout.findAll();
//         console.log(workoutData)

//         const workouts = workoutData.map((workout) => workout.get({ plain: true }));
//         console.log(workoutData)
//         res.render('profile');

        const profileData = await User.findByPk(req.session.user_id, {
            include: [{
                model: Workout,
                attributes: ['name', 'time', 'distance']
            }]
        });

//         // console.log("\nProfile data:", profileData, "\n")
//         const profileWithWorkouts = profileData.get({ plain: true })
//         // console.log("\nProfile with workouts:", profileWithWorkouts, "\n")

//         res.render('profile', profileWithWorkouts);


        const profileWithWorkouts = profileData.get({ plain: true })
        console.log(profileWithWorkouts)

        res.render('profile', profileWithWorkouts);
      
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;