const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to database sever', err);
    };

    db.collection('Todos').find().toArray()
    .then(data =>{
        console.log(`count: ${data.length}`)
    }
    , err => console.log('Unable to fetch todos', err))

    db.close();
});