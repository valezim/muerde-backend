const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {
    validatePostService,
    validatePutService,
} = require('./middlewares/serviceValidator');

const {
    generalQueryValidator,
    generalQueryValidatorIdRequired } = require('../middlewares/commonValidatorMiddlewares');

const ServiceController = require('../../controller/ServiceController');

router.route('/').post(validatePostService, ServiceController.postService);

router.route('/').put(generalQueryValidatorIdRequired, validatePutService, ServiceController.putService);

router.route('/').get(generalQueryValidator, ServiceController.getServices);

router.route('/').delete(generalQueryValidatorIdRequired, ServiceController.deleteService);

module.exports = router;
