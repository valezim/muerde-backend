const BaseRepo = require('./BaseRepo');

class ServiceRepo extends BaseRepo {
  constructor() {
    super();
  }

  async save(service) {
    try {
      const newService = await this.db.Service.create({
        data: {
          title: service.title,
          description: service.description,
          image: service.image,
          price: service.priceNumber,
          tags: service.tags,
          status: service.status,
          catalogId: service.catalogIdNumber,
        },
      });
      return newService;
    } catch (error) {
      console.log(`Error - ServiceRepo :: save - ${error.stack}`);
      throw error;
    }
  }

  async update(service) {
    try {
      const updatedService = await this.db.Service.update({
        where: {
          idService: service.idService,
        },
        data: {
          title: service.title || undefined,
          price: service.price || undefined,
          image: service.image || undefined,
          description: service.description || undefined,
          tags: service.tags || undefined,
          catalog_id: service.catalog_id || undefined,
          status: service.status || undefined,
        },
      });

      return updatedService;
    } catch (error) {
      console.log(`Error - ServiceRepo :: update - ${error.stack}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const services = await this.db.Service.findMany();
      return services;
    } catch (error) {
      console.log(`Error - serviceRepo :: getAll - ${error.stack}`);
      throw error;
    }
  }

  async getById({ idService }) {
    try {
      const service = await this.db.Service.findUnique({
        where: {
          idService: idService,
        },
      });
      return service;
    } catch (error) {
      console.log(`Error - serviceRepo :: getById - ${error.stack}`);
      throw error;
    }
  }
/*
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
  }*/

  async delete({idService}) {
    try {
      await this.db.Service.delete({
        where: {
            idService: idService,
        },
      });
    } catch (error) {
      console.log(`Error - ServiceRepo :: delete - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new ServiceRepo();
