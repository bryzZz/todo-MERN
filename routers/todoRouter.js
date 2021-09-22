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

// router.get('/:id', async (req, res) => {
//     try {
//         const todoList = await TodoList.findById(req.params.id);

//         res.json(todoList);
//     } catch (error) {
//         res.status(500).json({messege: "Something went wrong, try again"});
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const todoList = await TodoList.findByIdAndDelete(req.params.id);

//         res.json(todoList);
//     } catch (error) {
//         res.status(500).json({messege: "Something went wrong, try again"});
//     }
// })

module.exports = router;