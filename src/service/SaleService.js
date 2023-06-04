const SaleRepo = require('../repository/SaleRepo');

const SaleDTO = require('../dto/SaleDTO');

class SaleService {
  async getAllSales() {
    try {
      const sales = await SaleRepo.getAll();
      const SalesDTO = sales.map((sale) => new SaleDTO(sale));
      return SalesDTO;
    } catch (error) {
      console.log(`Error - SaleService :: getAllSales - ${error.stack}`);
      throw error;
    }
  }

  async getSalesById({idSale}) {
    try {
      const idSaleNumber = Number(idSale);
      const sale = await SaleRepo.getById({idSale: idSaleNumber});
      return sale;
    } catch (error) {
      console.log(`Error - SaleService :: getSalesById - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new SaleService();
