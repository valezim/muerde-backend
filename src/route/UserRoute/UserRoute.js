const express = require('express');
const router = express.Router();
const {
  validatePostUser,
} = require('./middlewares/userValidator');

const {
  generalQueryValidator 
} = require('../middlewares/commonValidatorMiddlewares');

const UserController = require('../../controller/UserController');

router.route('/').get(generalQueryValidator, UserController.getUsers);

router.route('/').post(validatePostUser, UserController.postUser);

router.post('/login', UserController.getUserByMail);

module.exports = router;
