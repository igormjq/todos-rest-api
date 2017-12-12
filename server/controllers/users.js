class Users {
  constructor(model) {
    this.users = model;
  }

  createNewUser(user, req, res) {
    this.users.create(user)
      .then(u => {
        res
          .status(200)
          .location(`/users/${u._id}`)
          .send({ status: 201, message: 'User created' });
      })
      .catch(e => {
        res
          .status(409)
          .send(Users.sendError(e));
      });
  };

  static sendError(e) {
    
    let error = {};

    if (e.name === 'ValidationError') {
      error.status = 400;
      error.message = 'Validation error. Please check sent data';
      error.missingKeys = Reflect.ownKeys(e.errors);
    } else if (e.code === 11000) {
      error.status = 409;
      error.message = 'E-mail address already in use. Duplicates not allowed';
    };

    return error;

  };

};

module.exports = Users;