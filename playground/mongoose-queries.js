const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const Todo = require('../server/models/todo');

let id = '5a274542553b371b379ae46f';

Todo.findById(id)
    .then(todo => {
       console.log('todo', todo);
       mongoose.connection.close();
    });


