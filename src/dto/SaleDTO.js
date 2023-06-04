
class SaleDTO {
    constructor(saleData = {}) {
      this.idSale = saleData.idSale;
      this.start_date = saleData.start_date;
      this.finish_date = saleData.finish_date;
      this.status = saleData.status;
      this.delivery_type = saleData.delivery_type;
      this.address = saleData.address;
      this.total_earn_cost = saleData.total_earn_cost;
      this.total_loss_cost = saleData.total_loss_cost;
      this.userId = saleData.userId;
      this.Review = saleData.Review;
      this.user = saleData.user;
      this.products = saleData.products;
    }
  }
  
  module.exports = SaleDTO;