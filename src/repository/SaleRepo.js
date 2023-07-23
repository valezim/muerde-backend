const BaseRepo = require('./BaseRepo');


const ProductRepo = require('./ProductRepo');

class SaleRepo extends BaseRepo {
  constructor() {
    super();
  }
  async getAll() {
    try {
      const sales = await this.db.Sale.findMany({
        select: {
          idSale: true,
          start_date: true,
          user_date: true,
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
                  catalog: true,
                },
              },
              quantity: true,
            },
          },
          user: {
            select: {
              idUser: true,
              name: true,
              mail: true,
              address: true,
            },
          },
        },
        orderBy: {
          start_date: 'desc',
        },

      });
      return sales;
    } catch (error) {
      console.log(`Error - IngredientRepo :: getAll - ${error.stack}`);
      throw error;
    }
  }

  async getById({idSale}) {
    try {
      const sale = await this.db.Sale.findUnique({
        where: {
          idSale: idSale,
        },
        select: {
          idSale: true,
          start_date: true,
          user_date: true,
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
                  catalog: true,
                },
              },
              quantity: true,
            },
          },
          user: {
            select: {
              idUser: true,
              name: true,
              mail: true,
              address: true,
            },
          },

        },
      });
      return sale;
    } catch (error) {
      console.log(`Error - SaleRepo :: getById - ${error.stack}`);
      throw error;
    }
  }

  async getSaleByUserId({idUser}) {
    try {
      const sale = await this.db.Sale.findMany({
        where: {
          userId: idUser,
        },
        select: {
          idSale: true,
          start_date: true,
          user_date: true,
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
                  catalog: true,
                },
              },
              quantity: true,
            },
          },
          user: {
            select: {
              idUser: true,
              name: true,
              mail: true,
              address: true,
            },
          },
        },
        orderBy: {
          start_date: 'desc',
        },
      });
      return sale;
    } catch (error) {
      console.log(`Error - SaleRepo :: getSaleByUserId - ${error.stack}`);
      throw error;
    }
  }


  async update({idSale, state}) {
    try {
      const updatedSale = await this.db.Sale.update({
        where: {
          idSale: idSale,
        },
        data: {
          status: state,
          finish_date: state == 'FINISHED' ? new Date() : null,
        },
      });
      return updatedSale;
    } catch (error) {
      console.log(`Error - SaleRepo :: update - ${error.stack}`);
      throw error;
    }
  }

  async getPriceAndCost(idProduct) {
    try {
      const product = await this.db.Product.findUnique({
        where: {
          idProduct: idProduct,
        },
        select: {
          price: true,
          recipe: {
            select: {
              idRecipe: true,
            },
          },
        },
      });
      const recipeIngredients = await this.db.recipeIngredient.findMany({
        where: {
          recipeId: product.recipe.idRecipe,
        },
      });
      let cost = 0;
      for (let i = 0; i < recipeIngredients.length; i++) {
        cost += await this.ingridientCost(recipeIngredients[i]);
      }
      const data = {
        price: product.price,
        cost: cost,
      };
      return data;
    } catch (error) {
      console.log(`Error - SaleRepo :: getPriceAndCost - ${error.stack}`);
      throw error;
    }
  }

  async ingridientCost(recipeIngredient) {
    const ingredient = await this.db.ingredient.findUnique({
      where: {
        idIngredient: recipeIngredient.ingredientId,
      },
    });
    return ingredient.lastPurchaseCost * recipeIngredient.quantity;
  }

  async save(sale) {
    console.log('saleee ', sale);
    try {
      let cost = 0;
      let price = 0;
      for (let i = 0; i < sale.products.length; i++) {
        const data = await this.getPriceAndCost(sale.products[i].productId);
        price += data.price * sale.products[i].quantity;
        cost += data.cost * sale.products[i].quantity;
        await ProductRepo.updateIngredientStock({
          product: sale.products[i].productId,
          quantity: sale.products[i].quantity,
        });
      }

      const dateAsDateTime = new Date(sale.userDate);
      const newSale = await this.db.Sale.create({
        data: {
          start_date: new Date(),
          user_date: dateAsDateTime,
          delivery_type: sale.deliveryType,
          status: 'TODO',
          total_earn_cost: price,
          total_loss_cost: cost,
          userId: Number(sale.userId),
        },
      });

      return newSale;
    } catch (error) {
      console.log(`Error - SaleRepo :: save - ${error.stack}`);
      throw error;
    }
  }

  async getTotalProgressStatusCount() {
    try {
      const statusCount = await this.db.Sale.groupBy({
        by: ['status'],
        where: {status: {not: 'FINISHED'}},
        _count: {status: true},
      });
      return statusCount;
    } catch (error) {
      console.log(`Error - IngredientRepo :: getTotalProgressStatusCount - ${error.stack}`);
      throw error;
    }
  }

  async getTotalSalesByCustomerBetweenDates(startDate, endDate) {
    try {
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();

      const totalSalesByCustomer = await this.db.sale.groupBy({
        by: ['userId'],
        where: {
          start_date: {
            lte: formattedStartDate,
          },
          start_date: {
            lte: formattedEndDate,
          },
        },
        orderBy: [
          {
            _count: {
              idSale: 'desc',
            },
          },
        ],
        _count: {idSale: true},
      });

      return totalSalesByCustomer;
    } catch (error) {
      console.log(`Error - IngredientRepo :: getTotalSalesByCustomerBetweenDates - ${error.stack}`);
      throw error;
    }
  }


  async getTotalSalesAndEarningsPerDaytBetweenDates(startDate, endDate) {
    try {
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();
      const sales = await this.db.sale.findMany({
        where: {
          finish_date: {
            not: null,
          },
          start_date: {
            lte: formattedStartDate,
          },
          start_date: {
            lte: formattedEndDate,
          },
        },
        orderBy: {
          finish_date: 'asc',
        },
        select: {
          idSale: true,
          finish_date: true,
          total_earn_cost: true,
          total_loss_cost: true,
        },
      });

      const salesPerDay = {};

      sales.forEach((sale) => {
        const date = sale.finish_date.toISOString().split('T')[0];

        if (!salesPerDay[date]) {
          salesPerDay[date] = {
            date: date,
            quantity: 1,
            earnings: sale.total_earn_cost - sale.total_loss_cost,
          };
        } else {
          salesPerDay[date].quantity += 1;
          salesPerDay[date].earnings += sale.total_earn_cost - sale.total_loss_cost;
        }
      });

      const result = Object.values(salesPerDay);

      return result;
    } catch (error) {
      console.log(`Error - IngredientRepo :: getTotalSalesAndEarningsPerDay - ${error.stack}`);
      throw error;
    }
  }

  async getTotalSalesAndEarningsPerDay() {
    try {
      const sales = await this.db.sale.findMany({
        where: {
          finish_date: {
            not: null,
          },
        },
        orderBy: {
          finish_date: 'asc',
        },
        select: {
          idSale: true,
          finish_date: true,
          total_earn_cost: true,
          total_loss_cost: true,
        },
      });

      const salesPerDay = {};

      sales.forEach((sale) => {
        const date = sale.finish_date.toISOString().split('T')[0];

        if (!salesPerDay[date]) {
          salesPerDay[date] = {
            date: date,
            quantity: 1,
            earnings: sale.total_earn_cost - sale.total_loss_cost,
          };
        } else {
          salesPerDay[date].quantity += 1;
          salesPerDay[date].earnings += sale.total_earn_cost - sale.total_loss_cost;
        }
      });

      const result = Object.values(salesPerDay);

      return result;
    } catch (error) {
      console.log(`Error - IngredientRepo :: getTotalSalesAndEarningsPerDay - ${error.stack}`);
      throw error;
    }
  }
}


module.exports = new SaleRepo();
