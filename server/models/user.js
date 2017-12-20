const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

// Instance method (each document will have it) to generate JWS token
UserSchema.methods.generateAuthToken = function() {
    const user = this; // refers to the instance of this model;
    const access = 'auth';
    const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens.push({ access, token });

    return user.save().then(() => token);

};

// UserSchema.methods.deleteToken = function(token) {
    
//     return this.update({
//         $pull: {
//             tokens: {token}
//         }
//     });
// };

// Class method (only the model) to find one user by token
UserSchema.statics.findByToken = function(token) {
    let decoded;

    // Verifies the user's token stored in the header;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject(e);
    }

    return this.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
    
};

UserSchema.statics.findByCredentials = function(email, password) {
    return this.findOne({ email })
        .then(user => {
            
            if(!user) {
                return Promise.reject();
            };
            
            return bcrypt.compare(password, user.password)
                .then(res => !!res ? user : Promise.reject())
        });
};

// Runs before each document is saved
UserSchema.pre('save', function(next) {
  
    if(this.isModified('password')) {
        bcrypt
            .genSalt(10)
                .then(salt => bcrypt.hash(this.password, salt))
                .then(hashedPassword => {
                    this.password = hashedPassword;
                    next();
                });
    } else {
        next();
    }
});

let User = mongoose.model('User', UserSchema);

module.exports = User;