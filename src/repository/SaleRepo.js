const { PrismaClient } = require('@prisma/client');


class SaleRepo {
  constructor() {
    this.db = new PrismaClient();
  }
  async getAll() {
    try {
      const sales = await this.db.Sale.findMany({
        select: {
          idSale: true,
          start_date: true,
          finish_date: true,
          status: true,
          delivery_type: true,
          status: true,
          total_earn_cost: true,
          total_loss_cost: true,
          products: {
            select: {
              product: {
                select: {
                  idProduct: true,
                  title: true,
                  description: true,
                  image: true,
                  price: true,
                  tags: true,
                  catalog: true
                }
              },
              quantity: true
            }
          },
          user: {
            select: {
              idUser: true,
              name: true,
              mail: true,
              address: true
            }
          }

        }

      });
      return sales;
    } catch (error) {
      console.log(`Error - IngredientRepo :: getAll - ${error.stack}`);
      throw error;
    }
  }

  async getById({ idSale }) {
    try {
      const sale = await this.db.Sale.findUnique({
        where: {
          idSale: idSale,
        },
        select: {
          idSale: true,
          start_date: true,
          finish_date: true,
          status: true,
          delivery_type: true,
          status: true,
          total_earn_cost: true,
          total_loss_cost: true,
          products: {
            select: {
              product: {
                select: {
                  idProduct: true,
                  title: true,
                  description: true,
                  image: true,
                  price: true,
                  tags: true,
                  catalog: true
                }
              },
              quantity: true
            }
          },
          user: {
            select: {
              idUser: true,
              name: true,
              mail: true,
              address: true
            }
          }

        }
      });
      return sale;
    } catch (error) {
      console.log(`Error - SaleRepo :: getById - ${error.stack}`);
      throw error;
    }
  }
}


module.exports = new SaleRepo();