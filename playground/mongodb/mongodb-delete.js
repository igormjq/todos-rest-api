const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    const toDoCollection = db.collection('Todos');

    if(err) {
        return console.log('Unable to connect to database sever', err);
    };

    /**
     * deleteMany
     * 
     * Deletes all documents matching specific criteria
     * @param {Object} filter - The filter, containg key-value pairs, used to select the documents to remove
     * @return {Promise}
     */

    toDoCollection
        .deleteMany({ property: 'value' })
            .then(docs => {
                console.log('res', docs);
            })
            .catch(err => console.log('Deleting operation could not be finished', err));

    /**
     *  deleteOne
     * 
     * Delete a single document matching a filter criteria
     * 
     * @param {Object} filter - The filter, containg key-value pairs, used to select the documents to remove
     * @return {Promise}
     * 
     */

    toDoCollection
        .deleteOne({ property: 'value' })
            .then(doc => console.log(doc))
            .catch(err => console.log('Failed', err));

    /**
     * findOneAndDelete
     * 
     * Finds and delete a document
     * 
     * @param {Object} filter - The filter, containg key-value pairs, used to select the documents to remove.
     * @return {Promise} - Promise that returns the deleted document if resolved and an error object if rejected
     */

    toDoCollection
        .findOneAndDelete({ property: 'value' })
            .then(doc => console.log(doc))
            .catch(err => console.log('Unable to finish operation', err));

    // Closes the connection to database
    db.close();
});