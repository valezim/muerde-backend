const CatalogRepo = require('../repository/CatalogRepo');
const { get } = require('../route/UserRoute/UserRoute');

class CatalogService {
  async postCatalog({type}) {
    try {
      const createdCatalog = await CatalogRepo.save({type});
      return createdCatalog;
    } catch (error) {
      console.log(`Error - CatalogService :: postCatalog - ${error.stack}`);
      throw error;
    }
  }

  async putCatalog({idCatalog, type}) {
    try {
      const idCatalogNumber = Number(idCatalog);
      const updatedCatalog = await CatalogRepo.update({idCatalog: idCatalogNumber, type});
      return updatedCatalog;
    } catch (error) {
      console.log(`Error - CatalogService :: putCatalog - ${error.stack}`);
      throw error;
    }
  }

  async getAllCatalogs() {
    try {
      const catalogs = await CatalogRepo.getAll();
      return catalogs;
    } catch (error) {
      console.log(`Error - CatalogService :: getAllCatalogs - ${error.stack}`);
      throw error;
    }
  }

  async getCatalogByType({type}) {
    try {
      const catalog = await CatalogRepo.getByType({type});
      if (!catalog) {
        const newCatalog = await CatalogRepo.save({type});
        console.log('el catalogo es new', newCatalog)
        return newCatalog;
      }
      return catalog;
    } catch (error) {
      console.log(`Error - CatalogService :: getCatalogByType - ${error.stack}`);
      throw error;
    }
  }

  async getCatalogById({idCatalog}) {
    try {
      const idCatalogNumber = Number(idCatalog);
      const catalog = await CatalogRepo.getById({idCatalog: idCatalogNumber});
      return catalog;
    } catch (error) {
      console.log(`Error - CatalogService :: getCatalogById - ${error.stack}`);
      throw error;
    }
  }

  async deleteCatalog({idCatalog}) {
    try {
      const idCatalogNumber = Number(idCatalog);
      await CatalogRepo.delete({idCatalog: idCatalogNumber});
    } catch (error) {
      console.log(`Error - CatalogService :: deleteCatalog - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new CatalogService();