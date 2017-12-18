const _ = require('lodash');

class Users {
  constructor(model) {
    this.users = model;
  }

  createNewUser(req, res) {
    let props = _.pick(req.body, ['email', 'password']);
    let user = new this.users(props);
  
    user
      .save()
        .then(() => user.generateAuthToken())
        .then(token => res.header('x-auth', token).status(201).send(user))
        .catch(err => res.status(409).send(Users.sendError(err)));
  };

  static sendError(e) {

    let error = {
      status: null,
      message: e.message
    };

    if (e.name === 'ValidationError') {
      error.status = 400;
      error.invalid_data = Reflect.ownKeys(e.errors);
    } else if (e.code === 11000) {
      error.status = 409;
      error.message = 'E-mail address already in use. Duplicates not allowed.';
    };

    return error;

  };

};

module.exports = Users;