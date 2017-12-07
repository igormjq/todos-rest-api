const express = require('express');

const router = require('express').Router();
const todosRoutes = require('./todo');

router.use('/todos', todosRoutes);
router.get('/', (req, res) => {
    res.json({
        details: 'Todo API',
        version: 1
    });
});


module.exports = router;