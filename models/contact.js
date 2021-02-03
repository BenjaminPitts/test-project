const mongoose = require('mongoose')

// TODO: Update to your resource name

const contactSchema = new mongoose.Schema(
  // TODO: update your resource properties
  {
    name: { type: String, required: true },
    age: { type: Number, default: 0 }
  },
  { timestamps: true }
)

// TODO: update your model
module.exports = mongoose.model('Contact', contactSchema)
