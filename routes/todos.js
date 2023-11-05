"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: "todo added", todos: todos });
});
router.put('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    console.log(tid);
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: 'todo updated', todos: todos });
    }
    res.status(400).json({ message: 'todo item not found' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
    res.status(200).json({ message: "todo delted", todos: todos });
});
exports.default = router;
