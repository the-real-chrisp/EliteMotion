const router = require('express').Router();
const { User, Workout } = require('../../models');

router.get('/', async (req, res) => {
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

        const workoutData = await Workout.findAll({
            include: [
                {
                    model: 'workout',
                    attribute: ['time', 'distance', 'date_created']
                }
            ]
        });

        res.json(profileData, workoutData)
    } catch {
        res.status(400).json(err)
    }
})

module.exports = router