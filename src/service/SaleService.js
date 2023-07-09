const SaleRepo = require('../repository/SaleRepo');

const SaleDTO = require('../dto/SaleDTO');
const SaleProductRepo = require('../repository/SaleProductRepo');
const DynamicProductStockService = require('./DynamicProductStockService');
const UserService = require('./UserService');
const ProductRepo = require('../repository/ProductRepo');

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
      return sale;
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
        state,
      });

      return updatedSale;
    } catch (error) {
      console.log(`Error - SaleService :: putSale - ${error.stack}`);
      throw error;
    }
  }


  async postSale({ deliveryType, userId, userDate, products = [] }) {
    try {
      const createdSale = await SaleRepo.save({ deliveryType, userId, userDate, products });
      products.forEach(async (product) => {
        await SaleProductRepo.save({
          saleId: createdSale.idSale,
          productId: product.productId,
          quantity: product.quantity,
        });
        await DynamicProductStockService.updateProductOOSByProductId(product.productId);
      });
      return createdSale;
    } catch (error) {
      console.log(`Error - SaleService :: postSale - ${error.stack}`);
      throw error;
    }
  }

  async getTotalProgressStatus() {
    try {
      const statusCounts = await SaleRepo.getTotalProgressStatusCount();

      return statusCounts.map((statusCount) => ({
        status: statusCount.status,
        totalCount: statusCount._count.status,
      }));
    } catch (error) {
      console.log(`Error - SaleService :: getTotalProgressStatus - ${error.stack}`);
      throw error;
    }
  }

  async getTotalSalesByCustomerBetweenDates(startDate, endDate) {
    try {
      if (!startDate) {
        const currentDate = new Date();
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      }

      if (!endDate) {
        endDate = new Date();
      }

      if (new Date(endDate) < new Date(startDate)) {
        endDate = startDate;
      }

      const salesByCustomer = await SaleRepo.getTotalSalesByCustomerBetweenDates(startDate, endDate);

      const salesWithUser = await Promise.all(salesByCustomer.map(async (sale) => {
        const user = await UserService.getById(sale?.userId);
        return {
          id_user: sale?.userId,
          name: user?.name,
          sales: sale?._count?.idSale,
        };
      }));

      return salesWithUser;
    } catch (error) {
      console.log(`Error - SaleService :: getTotalSalesByCustomerBetweenDates - ${error.stack}`);
      throw error;
    }
  }

  async getSalesByProduct(startDate, endDate) {
    try {
      if (new Date(endDate) < new Date(startDate)) {
        endDate = startDate;
      }

      return (startDate && endDate) ?
        await ProductRepo.getSalesByProductBetweenDates(startDate, endDate) :
        await ProductRepo.getSalesByProduct();
    } catch (error) {
      console.log(`Error - SaleService :: getTotalSalesByCustomerBetweenDates - ${error.stack}`);
      throw error;
    }
  };
}

module.exports = new SaleService();
