const BaseRepo = require('./BaseRepo');

class CatalogRepo extends BaseRepo {
  constructor() {
    super();
  }

  async save(Catalog) {
    try {
      const newCatalog = await this.db.Catalog.create({
        data: {
          type: Catalog.type,
        },
      });
      return newCatalog;
    } catch (error) {
      console.log(`Error - CatalogRepo :: save - ${error.stack}`);
      throw error;
    }
  }

  async update(Catalog) {
    try {
      const updatedCatalog = await this.db.Catalog.update({
        where: {
          idCatalog: Catalog.idCatalog,
        },
        data: {
          type: Catalog.type || undefined,
        },
      });
      return updatedCatalog;
    } catch (error) {
      console.log(`Error - CatalogRepo :: update - ${error.stack}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const catalogs = await this.db.Catalog.findMany();
      return catalogs;
    } catch (error) {
      console.log(`Error - CatalogRepo :: getAll - ${error.stack}`);
      throw error;
    }
  }

  async getById({idCatalog}) {
    try {
      const catalog = await this.db.Catalog.findUnique({
        where: {
          idCatalog: idCatalog,
        },
      });
      return catalog;
    } catch (error) {
      console.log(`Error - CatalogRepo :: getById - ${error.stack}`);
      throw error;
    }
  }

  async getByType({type}) {
    try {
      const catalog = await this.db.Catalog.findFirst({
        where: {
          type: type,
        },
      });
      return catalog;
    } catch (error) {
      console.log(`Error - CatalogRepo :: getByType - ${error.stack}`);
      throw error;
    }
  }

  async delete({idCatalog}) {
    try {
      await this.db.Catalog.delete({
        where: {
          idCatalog: idCatalog,
        },
      });
    } catch (error) {
      console.log(`Error - CatalogRepo :: delete - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new CatalogRepo();
