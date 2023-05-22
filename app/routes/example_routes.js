
const express = require('express')
const passport = require('passport')
const Example = require('../models/example')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/examples', (req, res, next) => {
  Example.find()
    .then(examples => {
      return examples.map(example => example.toObject())
    })
    .then(examples => res.status(200).json({ examples: examples }))
    .catch(next)
})

router.get('/examples/:id', requireToken, (req, res, next) => {
  Example.findById(req.params.id)
    .then(handle404)
    .then(example => res.status(200).json({ example: example.toObject() }))
    .catch(next)
})

router.post('/examples', requireToken, (req, res, next) => {
  req.body.example.owner = req.user.id

  Example.create(req.body.example)
    .then(example => {
      res.status(201).json({ example: example.toObject() })
    })
    .catch(next)
})

router.patch('/examples/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.example.owner

  Example.findById(req.params.id)
    .then(handle404)
    .then(example => {
      requireOwnership(req, example)

      return example.updateOne(req.body.example)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/examples/:id', requireToken, (req, res, next) => {
  Example.findById(req.params.id)
    .then(handle404)
    .then(example => {
      requireOwnership(req, example)
      example.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
