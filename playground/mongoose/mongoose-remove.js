const { ObjectID } = require('mongodb');

const { mongoose } = require('../../server/db/mongoose');
const Todo = require('../../server/models/todo');

let id = '5a275e8f824f873027df79a1';

// Remove every document that matches filter criteria. Does not return the document(s).
// Todo.remove({})
//     .then(result => {
//         console.log('Result', result);
//     });

// Finds the first occurrance of the filtered param and removes it. Returns the document.

Todo.findOneAndRemove({completed: false})
    .then(doc => {
        console.log('doc', doc); // expects some dummy data to be removed;
    });

// Finds by the document's id and removes it. Returns the document.
// Todo
//     .findByIdAndRemove(id)
//     .then(doc => {
//         console.log('deleted document', doc);
//     });
