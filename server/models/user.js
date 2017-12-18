const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: '{VALUE} is not a valid e-mail'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// Overrides how user is fetched in order not to send some props
UserSchema.methods.toJSON = function() {
    const user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id','email']);
};

// Generates JWS
UserSchema.methods.generateAuthToken = function() {
    const user = this; // refers to the instance of this model;
    const access = 'auth';
    const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens.push({ access, token });

    return user.save().then(() => token);

};

UserSchema.statics.findByToken = function(token) {
    const User = this; // refers to the model itself;
    let decoded;

    // Verifies the user's token stored in the header;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject(e);
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
    
};

let User = mongoose.model('User', UserSchema);

module.exports = User;