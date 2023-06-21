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
          finish_date: (state == 'DONE_PICK_UP' || state == 'DONE_DELIVERY') ? new Date() : null,
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
      const newSale = await this.db.Sale.create({
        data: {
          start_date: new Date(),
          delivery_type: sale.deliveryType,
          status: 'TODO',
          total_earn_cost: price,
          total_loss_cost: cost,
          userId: sale.userId,
        },
      });

      return newSale;
    } catch (error) {
      console.log(`Error - SaleRepo :: save - ${error.stack}`);
      throw error;
    }
  }
}


module.exports = new SaleRepo();
