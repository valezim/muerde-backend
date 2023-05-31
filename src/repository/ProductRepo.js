const {PrismaClient} = require('@prisma/client');

class ProductRepo {
  constructor() {
    this.db = new PrismaClient();
  }

  async save(Product) {
    try {
      const newProduct = await this.db.Product.create({
        data: {
            title: Product.title,
            description: Product.description,
            image: Product.image,
            price: Product.price,
            tags: Product.tags,
            status: Product.status,
            recipeId: Product.recipeId,
            catalogId: Product.catalogId,
        },
      });
      return newProduct;
    } catch (error) {
      console.log(`Error - ProductRepo :: save - ${error.stack}`);
      throw error;
    }
  }

  async update(Product) {
    try {
      const updatedProduct =await this.db.Product.update({
        where: {
          idProduct: Product.idProduct,
        },
        data: {
            title: Product.title || undefined,
            price: Product.price || undefined,
            image: Product.image || undefined,
            description: Product.description || undefined,
            tags: Product.tags || undefined,
            catalog_id: Product.catalog_id || undefined,
            status: Product.status || undefined
        },
      });
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

  async delete({idProduct}) {
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
}

module.exports = new ProductRepo();
