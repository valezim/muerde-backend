const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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
//router.route('/').post(upload.single('image'), validatePostProduct, ProductController.postProduct); // nueva ruta post con imagen

router.route('/').put(generalQueryValidatorIdRequired, validatePutProduct, ProductController.putProduct);

router.route('/').get(generalQueryValidator, ProductController.getProducts);

router.route('/').delete(generalQueryValidatorIdRequired, ProductController.deleteProduct);

router.route('/recipe').get(generalQueryValidator, ProductController.getProductsByRecipeId);

module.exports = router;
