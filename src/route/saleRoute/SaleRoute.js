const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {
    generalQueryValidator,
    generalQueryValidatorIdRequired} = require('../middlewares/commonValidatorMiddlewares');

const SaleController = require('../../controller/SaleController');
const { validatePutSale, validatePostSale } = require('./middlewares/saleValidator');


//GET ALL SALES and SALES BY ID
router.route('/').get(generalQueryValidator, SaleController.getSales);

//PUT SALES
router.route('/').put(generalQueryValidatorIdRequired, validatePutSale, SaleController.putSale);

//POST - NEW SALE
router.route('/').post(validatePostSale, SaleController.postSale);


module.exports = router;