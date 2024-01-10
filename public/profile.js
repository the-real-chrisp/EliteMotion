const goalForm = document.querySelector('.goal-description-form')
goalForm.addEventListener('submit', async e => {
    e.preventDefault()
    const {
        goal
    } = Object.fromEntries(new FormData(e.target))

    if (!goal) return

    let res = await fetch('/api/profile/goals', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({goal})
    })

    if (!res.ok) {
        console.log(res)
        alert('error')
        return
    }

    location.reload()
})

const workoutForm = document.querySelector('.new-workout-form')
workoutForm.addEventListener('submit', async e => {
    e.preventDefault()
    const {
        name,
        time,
        distance
    } = Object.fromEntries(new FormData(e.target))

    //
        // console.log(time)
        // return
    //

    if (!name || !time || !distance) return

    let res = await fetch('/api/profile/workouts', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, time, distance})
    })

    if (!res.ok) {
        console.log(res)
        alert('error')
        return
    }

    location.reload()
})