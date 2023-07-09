const humps = require('humps');
const SaleService = require('../service/SaleService');
const { SALE_STATES } = require('../config/default');


class SaleController {
  static async getSales(req, res) {
    try {
      const idSale = req.query.id;

      if (idSale) {
        const sale = await SaleService.getSalesById({ idSale });
        return res.json({ ...humps.decamelizeKeys(sale) });
      }
      const sales = await SaleService.getAllSales();
      return res.json({ orders: humps.decamelizeKeys(sales) });
    } catch (error) {
      console.log(`Error - SaleController :: getSales - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get orders',
        stack: error.stack,
      });
    }
  }

  static async getSalesByUserId(req, res) {
    try {
      const idUser = req.query.id;
      const sales = await SaleService.getSalesByUserId({ idUser });
      return res.json({ orders: humps.decamelizeKeys(sales) });
    } catch (error) {
      console.log(`Error - SaleController :: getSalesByUserId - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get orders',
        stack: error.stack,
      });
    }
  }

  static async putSale(req, res) {
    try {
      const idSale = req.query.id;
      const { state } = req.body;

      const updatedSale = await SaleService.putSale({ idSale, state });
      return res.json({ ...humps.decamelizeKeys(updatedSale) });
    } catch (error) {
      console.log(`Error - SaleController :: putSale - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to update Sale',
        stack: error.stack,
      });
    }
  }

  static async postSale(req, res) {
    try {
      const newSale = humps.camelizeKeys(req.body.sale);
      const createdSale = await SaleService.postSale(newSale);
      return res.json({ ...humps.decamelizeKeys(createdSale) });
    } catch (error) {
      console.log(`Error - SaleController :: postSale - ${error}`);
      if (error?.message?.includes('INSUFFICIENT_STOCK')) {
        return res.status(409).json({
          error: 'No hay suficiente stock para la cantidad solicitada.',
          stack: error.stack,
        });
      }
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to create Sale',
        stack: error.stack,
      });
    }
  }

  static async getAvailableOrderStates(req, res) {
    try {
      return res.json({ available_order_states: SALE_STATES });
    } catch (error) {
      console.log(`Error - SaleController :: getAvailableOrderStates - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get all available sale states',
        stack: error.stack,
      });
    }
  }

  static async getTotalProgressStatus(req, res) {
    try {
      const totalProgressStatus = await SaleService.getTotalProgressStatus();
      return res.json({ total_progress_status: humps.decamelizeKeys(totalProgressStatus) });
    } catch (error) {
      console.log(`Error - SaleController :: getTotalProgressStatus - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get total progress status',
        stack: error.stack,
      });
    }
  }

  static async getTotalSalesByCustomerBetweenDates(req, res) {
    try {
      const { start, end } = req.query;
      const totalSalesByCustomer = await SaleService.getTotalSalesByCustomerBetweenDates(start, end);
      return res.json({ sales_by_customer: humps.decamelizeKeys(totalSalesByCustomer) });
    } catch (error) {
      console.log(`Error - SaleController :: getTotalSalesByCustomerBetweenDates - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get total sales by customer',
        stack: error.stack,
      });
    }
  }

  static async getSalesByProduct(req, res) {
    try {
      const { start, end } = req.query;
      const salesByProduct = await SaleService.getSalesByProduct(start, end);
      return res.json({ sales_by_product: humps.decamelizeKeys(salesByProduct) });
    } catch (error) {
      console.log(`Error - SaleController :: getSalesByProduct - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get total sales by product',
        stack: error.stack,
      });
    }
  }

  static async getTotalSalesAndEarningsPerDay(req, res) {
    try {
      const { start, end } = req.query;
      const salesAndEarningsPerDay = await SaleService.getTotalSalesAndEarningsPerDay(start, end);
      return res.json({ sales_earnings_per_day: humps.decamelizeKeys(salesAndEarningsPerDay) });
    } catch (error) {
      console.log(`Error - SaleController :: getTotalSalesAndEarningsPerDay - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get total sales and earnings per day',
        stack: error.stack,
      });
    }
  }
}


module.exports = SaleController;
