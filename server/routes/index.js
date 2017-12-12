const express = require('express');
const router = express.Router();

// Routes
const todos = require('./todo');
const users = require('./user');

router.use('/users', users);
router.use('/todos', todos);
router.get('/', (req, res) => {
    res.json({
        details: 'Todo API',
        version: 1
    });
});

module.exports = router;