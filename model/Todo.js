const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema(
  {
    todo: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    dueDate: { type: Date, requited: true },
    priority: { type: String, requited: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Todo', todoSchema)
