const { ObjectID } = require('mongodb');

class Todos {
    constructor(model) {
        this.todo = model;
    }

    getAll(req, res) {
        this.todo
            .find({})
                .then(todos => {
                    res.json({status: 200, todos}).status(200);
                })
                .catch(err => res.status(400).json({ status: 400, message: err.message}));
    };

    getCompleted(req, res) {
        this.todo
            .find({ completed: true })
                .then(todos => {
                    if(todos)
                        return res.status(200).json(todos);
                    
                    res.status(200).json({
                        message: 'No todos completed'
                    })
                    .catch(err => res.status(400).send(err.message));
                })
                
    };

    getById(id, req, res) {
        
        if(!Todos.isValidId(id)) {
            return res.status(400).json({ status: 400, message: 'Bad request: invalid id' });
        };
        
        this.todo
            .findById(id)
                .then(todo => {
                    if(todo) 
                        return res.status(200).json({ 
                            status: 200, 
                            data: todo 
                        });
                            
                    res.status(404).json({ status: 404, message: 'Resource not found.' });
                })
                .catch(err => res.status(404).send(err.message));
    };

    create(todo, req, res) {
        this.todo
            .create(todo)
                .then(data => {
                    
                    let response = {
                        status: 201,
                        message: 'Todo saved successfully',
                        data
                    };

                    res.status(201).send(response);
                })
                .catch(err => res.status(400).json(err.message));
    };

    deleteById(id, req, res) {
        
        if(!Todos.isValidId(id)) {
            return res.status(400).json({ status: 400, message: 'Bad request: invalid id' });
        };
        
        this.todo
            .findByIdAndRemove(id)
                .then(doc => {
                    let response = {
                        status: 200,
                        message: 'Resource successfully removed'
                    };

                    res.status(200).json(response);
                })
                .catch(err => res.status(404).json(err.message));
    }

    static isValidId(id) {
        return ObjectID.isValid(id);
    }


};

module.exports = Todos;