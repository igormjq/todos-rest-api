const User = require('../models/user');

const auth = (req, res, next) => {

  let token = req.header('x-auth');
  
      User
        .findByToken(token)
          .then(user => {
            
            if(!user) {
              return Promise.reject();
            };
  
            req.user = user;
            req.token = token;
            
            next();
          })
          .catch(err => res.status(401).send({ status: 401, message: 'Invalid token' }));

};

module.exports = auth;