const BaseRepo = require('./BaseRepo');
const IngredientRepo = require('./IngredientRepo');

class ProductRepo extends BaseRepo {
  constructor() {
    super();
  }

  async save(product) {
    try {
      const newProduct = await this.db.product.create({
        data: {
          title: product.title,
          description: product.description,
          image: product.image,
          price: product.priceNumber,
          tags: product.tags,
          status: product.status,
          recipeId: product.recipeIdNumber,
          catalogId: product.catalogIdNumber,
          isOutOfStock: product.isOutOfStock,
        },
      });
      return newProduct;
    } catch (error) {
      console.log(`Error - ProductRepo :: save - ${error.stack}`);
      throw error;
    }
  }

  async update(product) {
    const shouldUpdateOOS = product?.isOutOfStock === true || product?.isOutOfStock === false;
    try {
      const updatedProduct = await this.db.product.update({
        where: {
          idProduct: product.idProduct,
        },
        data: {
          title: product.title || undefined,
          price: product.price || undefined,
          image: product.image || undefined,
          description: product.description || undefined,
          tags: product.tags || undefined,
          catalog_id: product.catalog_id || undefined,
          status: product.status || undefined,
          isOutOfStock: shouldUpdateOOS ? product.isOutOfStock : undefined,
        },
      });

      return updatedProduct;
    } catch (error) {
      console.log(`Error - ProductRepo :: update - ${error.stack}`);
      throw error;
    }
  }

  async updateOOSByRecipeId(recipeId, newOOS) {
    try {
      const updatedProduct = await this.db.Product.update({
        where: { recipeId: recipeId },
        data: { isOutOfStock: newOOS },
      });
      return updatedProduct;
    } catch (error) {
      console.log(`Error - ProductRepo :: updateOOSByRecipeId - ${error.stack}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const products = await this.db.Product.findMany();
      return products;
    } catch (error) {
      console.log(`Error - ProductRepo :: getAll - ${error.stack}`);
      throw error;
    }
  }

  async getById({ idProduct }) {
    try {
      const product = await this.db.Product.findUnique({
        where: {
          idProduct: idProduct,
        },
      });
      return product;
    } catch (error) {
      console.log(`Error - ProductRepo :: getById - ${error.stack}`);
      throw error;
    }
  }

  async getByRecipeId({ recipeId }) {
    try {
      const product = await this.db.Product.findUnique({
        where: { recipeId: recipeId },
      });
      return product;
    } catch (error) {
      console.log(`Error - ProductRepo :: getByRecipeId - ${error.stack}`);
      throw error;
    }
  }

  async getByIdWithIngredientsId({ idProduct }) {
    try {
      const product = await this.db.Product.findUnique({
        where: {
          idProduct: idProduct,
        },
        select: {
          recipe: {
            select: {
              RecipeIngredient: {

              },
            },
          },
        },

      });
      return product;
    } catch (error) {
      console.log(`Error - ProductRepo :: getById - ${error.stack}`);
      throw error;
    }
  }
  async delete({ idProduct }) {
    try {
      await this.db.Product.delete({
        where: {
          idProduct: idProduct,
        },
      });
    } catch (error) {
      console.log(`Error - ProductRepo :: delete - ${error.stack}`);
      throw error;
    }
  }

  async updateIngredientStock({ product, quantity }) {
    try {
      const fullProduct = await this.getByIdWithIngredientsId({ idProduct: product });
      let quantityToSubstract = 0;

      for (let i = 0; i < fullProduct.recipe.RecipeIngredient.length; i++) {
        quantityToSubstract = fullProduct.recipe.RecipeIngredient[i].quantity * quantity;
        await IngredientRepo.updateStock({
          idIngredient: fullProduct.recipe.RecipeIngredient[i].ingredientId,
          quantity: quantityToSubstract,
        });
      }
    } catch (error) {
      console.log(`Error - ProductRepo :: updateIngredientStock - ${error.stack}`);
      throw error;
    }
  }

  async getProductsByRecipeId(recipeId) {
    try {
      const recipeIdNumber = Number(recipeId);
      const products = await this.db.Product.findMany({
        where: {
          recipeId: recipeIdNumber,
        },
        include: {
          catalog: true,
        },
      });
      return products;
    } catch (error) {
      console.log(`Error - ProductRepo :: getProductsByRecipeId - ${error.stack}`);
      throw error;
    }
  }

  async getSalesByProductBetweenDates(startDate, endDate) {
    try {
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();

      const totalSalesByProduct = await this.db.product.findMany({
        select: {
          idProduct: true,
          sales: {
            select: {
              quantity: true,
            },
            where: {
              sale: {
                start_date: {
                  gte: formattedStartDate,
                  lte: formattedEndDate,
                },
              },
            },
          },
        },
        orderBy: {
          sales: {
            _count: 'desc',
          },
        },
        take: 10,
      });

      const formattedTotalSalesByProduct = await Promise.all(
        totalSalesByProduct.map(async (product) => {
          const productFullDetail = await this.getById({ idProduct: product.idProduct });
          return {
            id_product: product.idProduct,
            sales_count: product.sales.reduce((total, sale) => total + sale.quantity, 0),
            ...productFullDetail,
          };
        }),
      );

      return formattedTotalSalesByProduct.sort(
        (a, b) => b.sales_count - a.sales_count,
      ).slice(0, 10);
    } catch (error) {
      console.log(`Error - ProductRepo :: getSalesByProductBetweenDates - ${error.stack}`);
      throw error;
    }
  }


  async getSalesByProduct() {
    try {
      const totalSalesByProduct = await this.db.product.findMany({
        select: {
          idProduct: true,
          sales: {
            select: {
              quantity: true,
            },
          },
        },
        orderBy: {
          sales: {
            _count: 'desc',
          },
        },
        take: 10,
      });

      const formattedTotalSalesByProduct = await Promise.all(
        totalSalesByProduct.map(async (product) => {
          const productFullDetail = await this.getById({ idProduct: product.idProduct });
          return {
            sales_count: product.sales.reduce((total, sale) => total + sale.quantity, 0),
            ...productFullDetail,
          };
        }),
      );

      return formattedTotalSalesByProduct.sort(
        (a, b) => b.sales_count - a.sales_count,
      ).slice(0, 10);
    } catch (error) {
      console.log(`Error - ProductRepo :: getSalesByProduct - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new ProductRepo();
