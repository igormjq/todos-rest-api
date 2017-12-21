const express = require('express');
const _ = require('lodash');

const router = express.Router();
const Todo = require('../models/todo');
const auth = require('../middlewares/auth');
const Controller = require('../controllers/todos');
const TodoController = new Controller(Todo);

router
    .use(auth)
    .route('/')
        .get((req, res) => {
            TodoController.getAll(req, res);
        })
        .post((req, res) => {
            TodoController.create(req, res);
        });

router
    .route('/complete')
        .get((req, res) => {
            TodoController.getCompleted(req, res);
        });

router
    .use(auth)
    .route('/:id')
        .get((req, res) => {
            TodoController.getById(req, res);
        })
        .delete((req, res) => {
            TodoController.deleteById(req, res);
        })
        .patch((req, res) => {
            TodoController.updateById(req, res);
        });

module.exports = router;