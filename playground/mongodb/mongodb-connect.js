const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to database sever', err);
    }

    console.log('Connected to MongoDB server');

    let testToDo = {
        text: 'Something to do',
        completed: false
    };

    let testUser = {
        name: 'Igor',
        age: 25,
        location: 'Pelotas, RS, Brazil'
    };

    // db.collection('Todos').insertOne(testToDo, (err, result => {
    //     if(err) {
    //         return console.log('Could not add this document');
    //     }

    //     console.log('Document added successfully', result.ops);
    // }))

    db.collection('Users').insertOne(testUser, (err, result) => {
        if(err) {
            return console.log('Error', err);
        }

        console.log(`User ${testUser.name} added successfully`);
        console.log(JSON.stringify(result.ops, null, 2));
    })

    db.close();
});