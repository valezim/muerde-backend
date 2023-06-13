const SaleRepo = require('../repository/SaleRepo');

const SaleDTO = require('../dto/SaleDTO');
const SaleProductRepo = require('../repository/SaleProductRepo');

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

  async getSalesById({ idSale }) {
    try {
      const idSaleNumber = Number(idSale);
      const sale = await SaleRepo.getById({ idSale: idSaleNumber });
      return sale;
    } catch (error) {
      console.log(`Error - SaleService :: getSalesById - ${error.stack}`);
      throw error;
    }
  }

  async getSalesByUserId({ idUser }) {
    try {
      const idUserNumber = Number(idUser);
      const sale = await SaleRepo.getSaleByUserId({ idUser: idUserNumber });
      return sale[0];
    } catch (error) {
      console.log(`Error - SaleService :: getSalesByUserId - ${error.stack}`);
      throw error;
    }
  }


  async putSale({ idSale, state }) {
    try {
      const idSaleNumber = Number(idSale);

      const updatedSale = await SaleRepo.update({
        idSale: idSaleNumber,
        state
      });

      return updatedSale;
    } catch (error) {
      console.log(`Error - SaleService :: putSale - ${error.stack}`);
      throw error;
    }
  }


  async postSale({ deliveryType, userId, products = [] }) {
    try {
      const createdSale = await SaleRepo.save({deliveryType, userId, products});
      products.forEach((product) => {
        SaleProductRepo.save({
          saleId: createdSale.idSale,
          productId: product.productId,
          quantity: product.quantity
        })
      })
      return createdSale;
    } catch (error) {
      console.log(`Error - SaleService :: postSale - ${error.stack}`);
    throw error;
    }
  }
}

module.exports = new SaleService();