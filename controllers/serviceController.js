const Service = require('../models/service');

const ServiceController = {
  async createService(req, res) {
    try {
      const service = new Service(null, req.body.name, req.body.description, req.body.price);
      await service.save();
      res.status(201).json({ message: 'Service created successfully', service });
    } catch (err) {
      res.status(500).json({ error: 'Error creating service', details: err.message });
    }
  },

  async getAllServices(req, res) {
    try {
      const services = await Service.getAll();
      res.status(200).json(services);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all services', details: err.message });
    }
  },

  async getServiceById(req, res) {
    const { id } = req.params;
    try {
      const service = await Service.getById(id);
      if (!service) {
        res.status(404).json({ message: 'Service not found' });
      } else {
        res.status(200).json(service);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching service with ID ${id}`, details: err.message });
    }
  },

  async updateService(req, res) {
    const { id } = req.params;
    try {
      const service = await Service.getById(id);
      if (!service) {
        res.status(404).json({ message: 'Service not found' });
      } else {
        service.name = req.body.name;
        service.description = req.body.description;
        service.price = req.body.price;
        await service.update();
        res.status(200).json({ message: 'Service updated successfully', service });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating service with ID ${id}`, details: err.message });
    }
  },

  async deleteService(req, res) {
    const { id } = req.params;
    try {
      const service = await Service.getById(id);
      if (!service) {
        res.status(404).json({ message: 'Service not found' });
      } else {
        await service.delete();
        res.status(200).json({ message: 'Service deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting service with ID ${id}`, details: err.message });
    }
  }
};

module.exports = ServiceController;
