const express = require('express');

const router = express.Router();
const Todo = require('../models/todo');
const Controller = require('../controllers/todos');
const TodoController = new Controller(Todo);

router.route('/')
    .get((req, res) => {
        TodoController.getAll(req, res);
    })
    .post((req, res) => {
        let todo = req.body;

        TodoController.create(todo, req, res);
    });

router.route('/complete')
    .get((req, res) => {
        TodoController.getCompleted(req, res);
    });

router.route('/:id')
    .get((req, res) => {
        let id = req.params.id;
        
        TodoController.getById(id, req, res);
    })
    .delete((req, res) => {
        let id = req.params.id;
        console.log('DELETE /todos/:id', id);
        TodoController.deleteById(id, req, res);

    })
    .patch((req, res) => {

    });

module.exports = router;