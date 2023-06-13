const { PrismaClient } = require('@prisma/client');
const IngredientRepo = require('./IngredientRepo');

class ProductRepo {
  constructor() {
    this.db = new PrismaClient();
  }

  async save(product) {
    console.log("producto a guardar en el repo: ", product);
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
        },
      });
      return newProduct;
    } catch (error) {
      console.log(`Error - ProductRepo :: save - ${error.stack}`);
      throw error;
    }
  }

  async update(product) {
    try {
      const updatedProduct =await this.db.product.update({
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
            status: product.status || undefined
        },
      });

      console.log("updated product repo: ", updatedProduct);

      return updatedProduct;
    } catch (error) {
      console.log(`Error - ProductRepo :: update - ${error.stack}`);
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

  async getById({idProduct}) {
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

  async getByIdWithIngredientsId({ idProduct }) {
    try {
      const product = await this.db.Product.findUnique({
        where: {
          idProduct: idProduct,
        },
        select: {
          recipe: {
            select: {
              RecipeIngredient:{

              }
            }
          }
        }

      });
    return product;
  } catch(error) {
    console.log(`Error - ProductRepo :: getById - ${error.stack}`);
    throw error;
  }
}
  async delete ({ idProduct }) {
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
    const fullProduct = await this.getByIdWithIngredientsId({ idProduct: product })
    console.log('............................', fullProduct);
    let quantityToSubstract = 0;

    for (let i = 0; i < fullProduct.recipe.RecipeIngredient.length; i++) {
      console.log('FULLPRODUCTTTTTTTTTTTTTT', fullProduct.recipe.RecipeIngredient[i])
      quantityToSubstract = fullProduct.recipe.RecipeIngredient[i].quantity * quantity;
      await IngredientRepo.updateStock({ idIngredient: fullProduct.recipe.RecipeIngredient[i].ingredientId, quantity: quantityToSubstract });

    }

  } catch (error) {
    console.log(`Error - ProductRepo :: updateIngredientStock - ${error.stack}`);
    throw error;
  }
}

async getProductsByRecipeId({ recipeId }) {
  try {
    const products = await this.db.Product.findMany({
      where: {
        recipeId: recipeId,
      },
    });
    return products;
  } catch (error) {
    console.log(`Error - ProductRepo :: getProductsByRecipeId - ${error.stack}`);
    throw error;
  }
}
}

module.exports = new ProductRepo();
