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
                    model: User,
                    attributes: ['name', 'goal']
                }
            ]
        });

        const workoutData = await Workout.findAll({
            include: [
                {
                    model: Workout,
                    attributes: ['time', 'distance', 'date_created']
                }
            ]
        });

        res.json(profileData, workoutData)
    } catch {
        res.status(400).json(err)
    }

})

function printRouteError(req,error) {
    console.log(`
Error at ${req.method}/${req.url}
    `, error)
}

router.post('/workouts', async (req, res) => {
    try {

        await Workout.create({
            name: req.body.name,
            distance: parseFloat(req.body.distance),
            time: req.body.time,
            user_id: req.session.user_id
        })

        res.send('success')

    } catch (error) {
        printRouteError(req, error)
    }
})

router.post('/goals', async (req, res) => {
    try {

        await User.update(
            {goal: req.body.goal}, {
            where: {
                id: req.session.user_id
            }
        })
        res.send('success')

    } catch (error) {
        printRouteError(req, error)
    }

});

router.post('/', async (req, res) => {
    try {
        const newWorkout = await Workout.create({
            name: req.body.name,
            time: req.body.time,
            distance: req.body.distance,
        })
        res.status(200).json(newWorkout);
    } catch {
        res.status(400).json(err);
    }

})

module.exports = router