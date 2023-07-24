const Todo = require('../model/Todo')

const getAllTodos = async (req, res) => {
  const todos = await Todo.find()
  if (!todos) return res.status(204).json({ message: 'No todo found' })
  res.json(todos)
}

const addTodo = async (req, res) => {
  try {
    const result = await Todo.create({ ...req.body })
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: err.message, type: 'addTodo' })
  }
}

const updateTodo = async (req, res) => {
  if (!req?.body?._id) {
    return res.status(400).json({ message: 'ID parameter is required.' })
  }
  try {
    const todo = await Todo.findOne({ _id: req.body._id })
    if (!todo) return res.ststus(204).json({ message: 'No Todo with given ID' })
    var newTodo = { ...req.body }
    Object.assign(todo, newTodo)
    const result = await todo.save()
    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message, type: 'editTodo' })
  }
}

const getTodo = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: 'Todo ID required' })
  const todo = await Todo.findOne({ _id: req.params.id }).exec()
  if (!todo) {
    return res.status(204).json({ message: `Todo ID ${req.params.id} not found` })
  }
  res.json(todo)
}

const deleteTodo = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: 'Todo ID required' })
  const todo = await Todo.findOne({ _id: req.body.id }).exec()
  if (!todo) {
    return res.status(204).json({ message: `Todo ID ${req.body.id} not found` })
  }
  const result = await todo.deleteOne({ _id: req.body.id })
  res.json(result)
}

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  getTodo,
  deleteTodo,
}
