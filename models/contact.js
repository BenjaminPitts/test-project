const mongoose = require('mongoose')

// TODO: Update to your resource name

const quizSchema = new mongoose.Schema(
  // TODO: update your resource properties
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    answer_char: {type: String, required: true},
    point_value: {type: Number, required: true}
  }

)

// TODO: update your model
module.exports = mongoose.model('Quiz', quizSchema)
