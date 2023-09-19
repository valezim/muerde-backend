const humps = require('humps');
const ServiceService = require('../service/ServiceService');

class ServiceController {
    static async postService(req, res) {
        try {
            const imageFile = req.files?.image;
            const newService = humps.camelizeKeys(req.body);
            const createdService = await ServiceService.postService({ ...newService, imageFile });
            return res.json({ ...humps.decamelizeKeys(createdService) });
        } catch (error) {
            console.log(`Error - ServiceController :: postService - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to create a service',
            });
        }
    }

    static async putService(req, res) {
        try {
            const imageFile = req.files?.image
            const idService = req.query.id;
            const Service = humps.camelizeKeys(req.body);
            const updatedService = await ServiceService.putService({ ...Service, idService, imageFile });
            return res.json({ ...humps.decamelizeKeys(updatedService) });
        } catch (error) {
            console.log(`Error - ServiceController :: putService - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to update a service',
            });
        }
    }

    static async getServices(req, res) {
        try {
            const idService = req.query.id;

            if (idService) {
                const service = await ServiceService.getServiceById({ idService });
                return res.json({ ...humps.decamelizeKeys(service) });
            }
            const services = await ServiceService.getAllServices();
            return res.json({ Services: humps.decamelizeKeys(services) });
        } catch (error) {
            console.log(`Error - ServiceController :: getServices - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to get services',
            });
        }
    }

    static async deleteService(req, res) {
        try {
            const idService = req.query.id;
            console.log(req.query.id)
            await ServiceService.deleteService({ idService });
            return res.json({ message: `Service with id ${idService} deleted successfully.` });
        } catch (error) {
            console.log(`Error - ServiceController :: deleteService - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to delete a service',
            });
        }
    }
}

module.exports = ServiceController;