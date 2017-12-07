let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    }
});

let User = mongoose.model('Todo', UserSchema);

module.exports = User;