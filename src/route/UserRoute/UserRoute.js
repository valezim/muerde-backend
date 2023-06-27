const express = require('express');
const router = express.Router();
const {
  validatePostUser,
} = require('./middlewares/userValidator');

const {
  generalQueryValidator,
  generalQueryValidatorIdRequired} = require('../middlewares/commonValidatorMiddlewares');

const UserController = require('../../controller/UserController');

router.route('/').post(validatePostUser, UserController.postUser);

router.post('/login', UserController.getUserByMail);

module.exports = router;
