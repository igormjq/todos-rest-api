const express = require('express');

const router = require('express').Router();
const todosRoutes = require('./todo');

router.get('/', (req, res) => {
    res.json({
        details: 'Todo API',
        version: 1
    });
});
router.use('/todos', todosRoutes)

module.exports = router;