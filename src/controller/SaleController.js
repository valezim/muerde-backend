const humps = require('humps');
const SaleService = require('../service/SaleService');
const {SALE_STATES} = require('../config/default');


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
                error: 'Unexpected error while trying to get orders'
            });
        }
    }

    static async getSalesByUserId(req, res) {
        try {
            const idUser = req.query.id;
            const sales = await SaleService.getSalesByUserId({idUser});
            return res.json({ orders: humps.decamelizeKeys(sales) });
        } catch (error) {
            console.log(`Error - SaleController :: getSalesByUserId - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to get orders'
            });
        }
    }

    static async putSale(req, res) {
        try {
            const idSale = req.query.id;
            const {state} = req.body;

            const updatedSale = await SaleService.putSale({idSale, state})
            return res.json({ ...humps.decamelizeKeys(updatedSale) });

        } catch (error) {
            console.log(`Error - SaleController :: putSale - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to update Sale',
            });
        }
    }

    static async postSale(req, res) {
        try {
          const newSale = humps.camelizeKeys(req.body.sale);
          const createdSale = await SaleService.postSale(newSale);
          return res.json({...humps.decamelizeKeys(createdSale)});
        } catch (error) {
          console.log(`Error - SaleController :: postSale - ${error}`);
          return res.status(error.status || 500).json({
            error: 'Unexpected error while trying to create Sale',
          });
        }
      }

      static async getAvailableOrderStates(req, res) {
        try {
          return res.json({available_order_states: SALE_STATES});
        } catch (error) {
          console.log(`Error - SaleController :: getAvailableOrderStates - ${error}`);
          return res.status(error.status || 500).json({
            error: 'Unexpected error while trying to get all available sale states',
          });
        }
      }

    
}




module.exports = SaleController;