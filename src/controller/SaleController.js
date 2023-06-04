const humps = require('humps');
const SaleService = require('../service/SaleService');


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

    static async putSale(req, res) {
        try {
            
            const idSale = req.query.id;
            const {state} = req.body.sale

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

    
}




module.exports = SaleController;