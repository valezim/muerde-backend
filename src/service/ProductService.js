const ProductRepo = require('../repository/ProductRepo');

class ProductService {
  async postProduct({title, description, image, price, tags, status, recipeId, catalogId}) {
    try {
      const priceNumber = Number(price);
      const recipeIdNumber = Number(recipeId);
      const catalogIdNumber = Number(catalogId);
      const createdProduct = await ProductRepo.save({title, description, image, priceNumber, tags, status, recipeIdNumber, catalogIdNumber});
      console.log("post product servicio: ", createdProduct);
      return createdProduct;
    } catch (error) {
      console.log(`Error - ProductService :: postProduct - ${error.stack}`);
      throw error;
    }
  }

  async putProduct({idProduct, title, price, image, description, tags, catalog_id, status}) {
    try {
      const idProductNumber = Number(idProduct);
      const priceNumber = Number(price);
      const catalogIdNumber = Number(catalog_id);
      const updatedProduct = await ProductRepo.update({idProduct: idProductNumber, title, priceNumber, image, description, tags, catalogIdNumber, status});
      console.log("put product servicio: ", updatedProduct);

      return updatedProduct;
    } catch (error) {
      console.log(`Error - ProductService :: putProduct - ${error.stack}`);
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await ProductRepo.getAll();
      return products;
    } catch (error) {
      console.log(`Error - ProductService :: getAllProducts - ${error.stack}`);
      throw error;
    }
  }

  async getProductById({idProduct}) {
    try {
      const idProductNumber = Number(idProduct);
      const Product = await ProductRepo.getById({idProduct: idProductNumber});
      return Product;
    } catch (error) {
      console.log(`Error - ProductService :: getProductById - ${error.stack}`);
      throw error;
    }
  }

  async deleteProduct({idProduct}) {
    try {
      const idProductNumber = Number(idProduct);
      await ProductRepo.delete({idProduct: idProductNumber});
    } catch (error) {
      console.log(`Error - ProductService :: deleteProduct - ${error.stack}`);
      throw error;
    }
  }

  async getProductsByRecipeId({recipeId}) {
    try {
      const recipeIdNumber = Number(recipeId);
      const products = await ProductRepo.getProductsByRecipeId({recipeId: recipeIdNumber});
      return products;
    } catch (error) {
      console.log(`Error - ProductService :: getProductsByRecipeId - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new ProductService();