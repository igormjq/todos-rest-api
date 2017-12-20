const _ = require('lodash');

const { ObjectID } = require('mongodb');

class Todos {
    constructor(model) {
        this.todo = model;
    }

    getAll(req, res) {
        this.todo
            .find({ _creator: req.user._id })
                .then(todos => {
                    res.send({ status: 200, todos }).status(200);
                })
                .catch(err => res.status(400).send({ status: 400, message: err.message }));
    };

    getCompleted(req, res) {
        this.todo
            .find({ completed: true })
                .then(todos => {
                    if(todos)
                        return res.status(200).send(todos);
                    
                    res.status(200).send({
                        message: 'No todos completed'
                    })
                    .catch(err => res.status(400).send(err.message));
                })
                
    };

    getById(req, res) {
        let _id = req.params.id;
    
        let query = {
            _id,
            _creator: req.user._id
        };
        console.log(query);

        if(!Todos.isValidId(_id)) {
            return res.status(400).send({ status: 400, message: 'Bad request: invalid id' });
        };
        
        this.todo
            .findOne(query)
                .then(todo => {
                    if(todo) 
                        return res.status(200).send({ 
                            status: 200, 
                            data: todo 
                        });
                            
                    res.status(404).send({ status: 404, message: 'Resource not found.' });
                })
                .catch(err => res.status(404).send(err.message));
    };

    create(req, res) {
        let todo = req.body;
        todo._creator = req.user;

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
                .catch(err => res.status(400).send(err.message));
    };

    deleteById(id, req, res) {
        
        if(!Todos.isValidId(id)) {
            return res.status(400).send({ status: 400, message: 'Bad request: invalid id' });
        };
        
        this.todo
            .findByIdAndRemove(id)
                .then(doc => {
                    let response = {
                        status: 200,
                        message: 'Resource successfully removed'
                    };

                    res.status(200).send(response);
                })
                .catch(err => res.status(404).send(err.message));
    };

    updateById(id, body, req, res) {

        let options = { new: true };
        
        
        if(!Todos.isValidId(id)) {
            return res.status(400).send({ status: 400, message: 'Bad request: invalid id' });
        };

        body.completedAt = Todos.isCompleted(body) ? new Date().getTime() : null;
        body.complete = !!body.completedAt;

        this.todo
            .findByIdAndUpdate(id, { $set: body }, options)
                .then(todo => {
                     
                    if(todo) 
                        return res.status(200).send({ 
                            status: 200, 
                            data: todo 
                        });
                    
                    res.status(404).send({ status: 404, message: 'Resource not found' });

                })
                .catch(err => res.status(400).send(err.message));
    };

    static isValidId(id) {
        return ObjectID.isValid(id);
    }

    static isCompleted (todo) {
        return _.isBoolean(todo.completed) && todo.completed;
    };

};

module.exports = Todos;