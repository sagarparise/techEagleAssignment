const express = require('express');
const protectedMid = require('../middlewares/protected');
const { addTodo, getTodo, deleteTodo, updateTodo } = require('../controllers/todoController');

const todoRouter = express.Router();

todoRouter.post('/add',protectedMid, addTodo)
todoRouter.get('/get',protectedMid, getTodo)
todoRouter.delete('/delete/:id',protectedMid, deleteTodo)
todoRouter.put('/update/:id',protectedMid, updateTodo)



module.exports = todoRouter;