let mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.Promise = global.Promise;

mongoose.connect(uri, { useMongoClient: true });

module.exports = { mongoose };