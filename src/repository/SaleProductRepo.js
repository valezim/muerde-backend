const BaseRepo = require('./BaseRepo');

class SaleProductRepo extends BaseRepo {
  constructor() {
    super();
  }

  async save({saleId, productId, quantity}) {
    try {
      const newSaleProduct = await this.db.SaleProduct.create({
        data: {
          saleId,
          productId,
          quantity,
        },
      });
      return newSaleProduct;
    } catch (error) {
      console.log(`Error - SaleProductRepo :: save - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new SaleProductRepo();
