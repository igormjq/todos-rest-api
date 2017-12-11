const { ObjectID } = require('mongodb');

const { mongoose } = require('../../server/db/mongoose');
const Todo = require('../../server/models/todo');

let id = '5a274542553b371b379ae46f';
let id2 = '5a275e8f824f873027df79a1';

Todo.findById(id)
    .then(todo => {
       console.log('todo', todo);
       mongoose.connection.close();
    });