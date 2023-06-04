const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {
    generalQueryValidator,
    generalQueryValidatorIdRequired} = require('../middlewares/commonValidatorMiddlewares');

const SaleController = require('../../controller/SaleController');


//GET ALL SALES and SALES BY ID
router.route('/').get(generalQueryValidator, SaleController.getSales);


module.exports = router;