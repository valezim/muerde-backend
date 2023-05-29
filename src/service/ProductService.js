const ProductRepo = require('../repository/ProductRepo');
const ProductDTO = require('../dto/ProductDTO');

class ProductService {
  async postProduct({title, price, image, description, tags, catalog_id, recipe_id}) {
    try {
      const createdProduct = await ProductRepo.save({title, price, image, description, tags, catalog_id, recipe_id});
      return createdProduct;
    } catch (error) {
      console.log(`Error - ProductService :: postProduct - ${error.stack}`);
      throw error;
    }
  }

  async putProduct({idProduct, title, price, image, description, tags, catalog_id, status}) {
    try {
      const idProductNumber = Number(idProduct);
      const updatedProduct = await ProductRepo.update({idProduct: idProductNumber, title, price, image, description, tags, catalog_id, status});
      return updatedProduct;
    } catch (error) {
      console.log(`Error - ProductService :: putProduct - ${error.stack}`);
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const Products = await ProductRepo.getAll();
      const ProductsDTO = Products.map((Product) => new ProductDTO(Product));
      return ProductsDTO;
    } catch (error) {
      console.log(`Error - ProductService :: getAllProducts - ${error.stack}`);
      throw error;
    }
  }

  async getProductById({idProduct}) { // Para el detalle del producto?
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
}

module.exports = new ProductService();