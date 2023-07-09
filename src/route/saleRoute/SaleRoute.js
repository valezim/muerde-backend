const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {
    generalQueryValidator,
    generalQueryValidatorIdRequired } = require('../middlewares/commonValidatorMiddlewares');

const SaleController = require('../../controller/SaleController');
const { validatePutSale, validatePostSale } = require('./middlewares/saleValidator');


// GET ALL SALES and SALES BY ID
router.route('/').get(generalQueryValidator, SaleController.getSales);

// GET SALES BY USER ID
router.route('/user').get(generalQueryValidator, SaleController.getSalesByUserId);

// PUT SALES
router.route('/').put(generalQueryValidatorIdRequired, validatePutSale, SaleController.putSale);

// POST - NEW SALE
router.route('/').post(validatePostSale, SaleController.postSale);

// GET AVAILABLE ORDER STATES
router.route('/states').get(SaleController.getAvailableOrderStates);

// GET IN PROGRESS STATUS COUNT
router.route('/total_progress_status').get(SaleController.getTotalProgressStatus);


module.exports = router;
