const ServiceRepo = require('../repository/ServiceRepo');
const CatalogServiceService = require('../service/CatalogService');

class ServiceService {
  async postService({ title, description, image, price, tags, status, catalogId }) {

    let imageLocation = '';
    try {
      if (image) {
        const { location } = await BucketService.uploadFile(image);
        imageLocation = location;
      }
    } catch (error) {
      console.log(`Error - ProductService :: postProduct - Error while saving image - ${error.stack}`);
    }



    try {
      const priceNumber = Number(price);
      const catalog = await CatalogServiceService.getCatalogByType({ type: 'ServiceCatalog' });
      const catalogIdNumber = catalog.idCatalog;
      const createdService = await ServiceRepo.save({
        title,
        description,
        image: imageLocation,
        priceNumber,
        tags,
        status: status || 'ENABLED',
        catalogIdNumber,
      });
      return createdService;
    } catch (error) {
      console.log(`Error - ServiceService :: postService - ${error.stack}`);
      throw error;
    }
  }

  async putService({ idService, title, price, image, description, tags, catalog_id, status }) {
    let imageLocation = '';
    try {
      if (image) {
        const { location } = await BucketService.uploadFile(image);
        imageLocation = location;
      }
    } catch (error) {
      console.log(`Error - ProductService :: postProduct - Error while saving image - ${error.stack}`);
    }
    try {
      const idServiceNumber = Number(idService);
      const priceNumber = Number(price);
      const catalogIdNumber = Number(catalog_id);
      const updatedService = await ServiceRepo.update({ 
        idService: idServiceNumber, 
        title, 
        price: priceNumber, 
        image: imageLocation, 
        description, 
        tags, 
        catalogIdNumber, 
        status });
      return updatedService;
    } catch (error) {
      console.log(`Error - ServiceService :: putService - ${error.stack}`);
      throw error;
    }
  }

  async getAllServices() {
    try {
      const services = await ServiceRepo.getAll();
      return services;
    } catch (error) {
      console.log(`Error - ServiceService :: getAllServices - ${error.stack}`);
      throw error;
    }
  }

  async getServiceById({ idService }) {
    try {
      const idServiceNumber = Number(idService);
      const Service = await ServiceRepo.getById({ idService: idServiceNumber });
      return Service;
    } catch (error) {
      console.log(`Error - ServiceService :: getServiceById - ${error.stack}`);
      throw error;
    }
  }

  async deleteService({ idService }) {
    try {
      const idServiceNumber = Number(idService);
      await ServiceRepo.delete({ idService: idServiceNumber });
    } catch (error) {
      console.log(`Error - ServiceService :: deleteService - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new ServiceService();
