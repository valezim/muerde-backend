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
}




module.exports = SaleController;