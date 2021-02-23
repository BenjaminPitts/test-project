const express = require('express')
// TODO: rename express Router to your resource
const quiz = express.Router()
// TODO: rename your Model to your resource
// TODO: make sure you are requiring the correct file
const Quiz = require('../models/contact.js')

// TODO: rename each router to your resource for each route and rename each model for all 5 routes

// CREATE
// TODO: rename router to your resource
quiz.post('/', (req, res) => {
  // TODO: Update Contact to your resource
  Quiz.create(req.body, (error, createdContact) => {
    if (error) {
      res.status(400).json({ error: error })
    } else {
      Quiz.find({}, (error, createdContact)=>{
        res.json(createdContact)
      })
    }
   })
})

// READ
// TODO: rename router to your resource
quiz.get('/', (req, res) => {
  // TODO: Update Contact to your resource
  Quiz.find({}, (error, foundContacts) => {
    if (error) {
      res.status(400).json({ error: error })
    } else {
    res.json(foundContacts)
    }
   })
})

// UPDATE
// TODO: rename router to your resource
quiz.put('/:id', (req, res) => {
  // TODO: Update Contact to your resource
  Quiz.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedContact) => {
      if (err) {
        res.status(400).json({ error: err.message })
      } else {
        Quiz.find({}, (err, updatedContact)=>{
          res.json(updatedContact)
        })
      }
    }
  )
})

// DELETE
// TODO: rename router to your resource
quiz.delete('/:id', (req, res) => {
  // TODO: Update Contact to your resource
  Quiz.findByIdAndRemove(req.params.id, (error, deletedContact) => {
    if (error) {
      res.status(400).json({ error: error })
    } else {
      Quiz.find({}, (err, deletedContact)=>{
        res.json(deletedContact)
      })
    }
  })
})

// Handle 404
// TODO: rename router to your resource
quiz.get('/*', (req, res) => {
  res.status(404).json({ error: 'page not found' })
})

module.exports = quiz
