const { Router } = require('express');
const Todo = require('../models/Todo');
// const auth = require('../middleware/auth');
const todos = require('../middleware/todos');
const router = Router();

router.post('/create', todos, async (req, res) => {
    try {
        const { listId } = req;
        const {text} = req.body;

        const todo = new Todo({text, list: listId});

        await todo.save();

        res.status(201).json({ todo });
    } catch (error) {
        res.status(500).json({messege: "Something went wrong, try again"});
    }
});

router.get('/', todos, async (req, res) => {
    try {
        const { listId } = req;

        const todos = await Todo.find({ list: listId });

        res.json(todos);
    } catch (error) {
        res.status(500).json({messege: "Something went wrong, try again"});
    }
});

router.post('/star/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        todo.starred = !todo.starred;
        await todo.save();

        res.json(todo);
    } catch (error) {
        res.status(500).json({messege: "Something went wrong, try again"});
    }
});

router.post('/complite/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        todo.complited = !todo.complited;
        await todo.save();

        res.json(todo);
    } catch (error) {
        res.status(500).json({messege: "Something went wrong, try again"});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        res.json(todo);
    } catch (error) {
        res.status(500).json({messege: "Something went wrong, try again"});
    }
});

module.exports = router;