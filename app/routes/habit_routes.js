const express = require('express')
const passport = require('passport')

const Habit = require('../models/habit')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')


const requireToken = passport.authenticate('bearer', {
  session: false })

const router = express.Router()

// INDEX
// ?? why toObject then to .json? watch video.
router.get('/habits', requireToken, (req, res, next) => {
  Habit.find({ owner: req.user.id })
    // .then(handle404)
    .then(habits => {
      return habits.map(habit => habit.toObject())
    })
    .then(habits => res.status(200).json({ habits: habits }))
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/habits/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Habit.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(habit => res.status(200).json({ habit: habit.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE 
router.post('/habits', requireToken, (req, res, next) => {
  // ?? not fully understand -- study... 
  req.body.habit.owner = req.user.id

  Habit.create(req.body.habit)
    .then(habit => {
      res.status(201).json({ habit: habit.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/habits/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.habit.owner

  Habit.findById(req.params.id)
    .then(handle404)
    .then(habit => {
      requireOwnership(req, habit)

      return habit.updateOne(req.body.habit)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/habits/:id', requireToken, (req, res, next) => {
  Habit.findById(req.params.id)
    .then(handle404)
    .then(habit => {
      requireOwnership(req, habit)
      habit.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
