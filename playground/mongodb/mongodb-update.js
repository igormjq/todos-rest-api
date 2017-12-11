const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    const toDoCollection = db.collection('Todos'),
    usersCollection = db.collection('Users');

    if(err) {
        return console.log('Unable to connect to database sever', err);
    };

    /**
     * findOneAndUpdate
     * 
     * @param { Object } filter - Document selection filter
     * @param { Object } update - Update operations to be performed
     * @param { Object } options - Optional settings
     * 
     * @return { Promise } - Promise returning the old object if resolved or an Error if rejects
     * 
     */

    let target = {
        _id: new ObjectID('5a1263903a5fc32056157ce5')
    };

    let operation = {
        $set: {
            name: 'Igor Marini Jaekel Quevedo'
        },
        $inc: {
            age: 5
        }
    };

    let options = {
        returnOriginal: false
    };

    usersCollection
        .findOneAndUpdate(target, operation, options)
            .then(doc => console.log(doc))
            .catch(err => console.log('An error has occurred', err));

    // Closes the connection to database
    db.close();
});