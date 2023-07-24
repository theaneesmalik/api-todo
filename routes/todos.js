const express = require('express')
const router = express.Router()
const { getAllTodos, addTodo, updateTodo, getTodo, deleteTodo } = require('../controllers/todosController')

router.route('/').get(getAllTodos).post(addTodo).put(updateTodo).delete(deleteTodo)

router.route('/:id').get(getTodo)

module.exports = router

/*
post    C
put     U
detalte R
get     D
*/
