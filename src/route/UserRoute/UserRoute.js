const express = require('express');
const router = express.Router();
const {
  validatePostUser,
  validatePutUser,
} = require('./middlewares/userValidator');

const {
  generalQueryValidator,
  generalQueryValidatorIdRequired} = require('../middlewares/commonValidatorMiddlewares');

const UserController = require('../../controller/UserController');

router.route('/').get(generalQueryValidator, UserController.getUsers);

router.route('/').post(validatePostUser, UserController.postUser);

router.route('/').put(generalQueryValidatorIdRequired, validatePutUser, UserController.putUser);

router.post('/login', UserController.getUserByMail);

module.exports = router;
