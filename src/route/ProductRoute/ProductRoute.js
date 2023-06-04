const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  validatePostProduct,
  validatePutProduct,
} = require('./middlewares/productValidator');

const {
  generalQueryValidator,
  generalQueryValidatorIdRequired} = require('../middlewares/commonValidatorMiddlewares');

const ProductController = require('../../controller/ProductController');

router.route('/').post(validatePostProduct, ProductController.postProduct);

router.route('/').put(generalQueryValidatorIdRequired, validatePutProduct, ProductController.putProduct);

router.route('/').get(generalQueryValidator, ProductController.getProducts);

router.route('/').delete(generalQueryValidatorIdRequired, ProductController.deleteProduct);

module.exports = router;
