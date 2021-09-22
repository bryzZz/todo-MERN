const { Router } = require('express');
const TodoList = require('../models/TodoList');
const auth = require('../middleware/auth');
const router = Router();

router.post('/create', auth, async (req, res) => {
    try {
        const {name} = req.body;

        const existing = await TodoList.findOne({name});

        if(existing){
            return res.json(existing);
        }

        const todoList = new TodoList({name, owner: req.user.userId});

        await todoList.save();

        res.status(201).json({ todoList });
    } catch (error) {
        res.status(500).json({messege: "Something went wrong, try again"});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const todoLists = await TodoList.find({ owner: req.user.userId });

        res.json(todoLists);
    } catch (error) {
        res.status(500).json({messege: "Something went wrong, try again"});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const todoList = await TodoList.findById(req.params.id);

        res.json(todoList);
    } catch (error) {
        res.status(500).json({messege: "Something went wrong, try again"});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const todoList = await TodoList.findByIdAndDelete(req.params.id);

        res.json(todoList);
    } catch (error) {
        res.status(500).json({messege: "Something went wrong, try again"});
    }
})

module.exports = router;