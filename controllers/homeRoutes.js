const router = require('express').Router();
const { Workout, User } = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/profile')
            return
        }
        res.render('homepage')
    } catch {
        res.status(500).json(err);
    }
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

router.get('/profile', auth, async (req, res) => {
    try {
        
        const profileData = await User.findByPk(req.session.user_id, {
            include: [{
                model: Workout,
                attributes: ['name', 'time', 'distance']
            }]
        });

        const profileWithWorkouts = profileData.get({ plain: true })
        console.log(profileWithWorkouts)

        res.render('profile', profileWithWorkouts);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signout', async (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log("Error destroying session: ", err)
        }
        res.redirect('/')
    })
})

module.exports = router;