import { Router } from "express";

import { Todo } from '../models/Todo';

const router = Router();

let todos: Todo[] = [];

router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos});
})

router.post('/todo', (req, res, next) => {
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    }
    todos.push(newTodo);
    res.status(201).json({message: "todo added"});
})

router.put('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid)

    if(todoIndex){
        todos[todoIndex] = {id: todos[todoIndex].id, text: req.body.text}
        return res.status(200).json({message: 'todo updated', todos: todos})
    }
    res.status(400).json({message: 'todo item not found'})
})

router.delete('/todo/:todoId', (req, res, next) => {
     todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId)
    res.status(200).json({message: "todo delted", todos: todos})
})

export default router;