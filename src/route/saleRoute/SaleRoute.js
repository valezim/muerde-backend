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

// GET TOTAL SALES BY CUSTOMER
router.route('/total_customer').get(SaleController.getTotalSalesByCustomerBetweenDates);

// GET SALES BY PRODUCT
router.route('/total_product').get(SaleController.getSalesByProduct);

// GET SALES COUNT AND EARNINGS PER DAY
router.route('/sales_earnings_per_day').get(SaleController.getTotalSalesAndEarningsPerDay);

// GET ORDER PREPARATION SUGGESTIONS
router.route('/order_preparation_suggestions').get(SaleController.getOrderPreparationSuggestions);

module.exports = router;
