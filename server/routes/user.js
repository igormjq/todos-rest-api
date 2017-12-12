const express = require('express');
const _ = require('lodash');
const Controller = require('../controllers/users');

const router = express.Router();

const User = require('../models/user');
const UserController = new Controller(User);

router.route('/')
  .post((req, res) => {
    let user = _.pick(req.body, ['email', 'password']);

    UserController.createNewUser(user, req, res);
    
  });

module.exports = router;