const express = require('express');
const router = express.Router();
const {
  validatePostCatalog,
  validatePutCatalog,
} = require('./middlewares/catalogValidator');

const {
  generalQueryValidator,
  generalQueryValidatorIdRequired} = require('../middlewares/commonValidatorMiddlewares');

const CatalogController = require('../../controller/CatalogController');

router.route('/').post(validatePostCatalog, CatalogController.postCatalog);

router.route('/').put(generalQueryValidatorIdRequired, validatePutCatalog, CatalogController.putCatalog);

router.route('/').get(generalQueryValidator, CatalogController.getCatalogs);

router.route('/').delete(generalQueryValidatorIdRequired, CatalogController.deleteCatalog);

module.exports = router;
