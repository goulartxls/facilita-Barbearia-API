const OrderService = require('../models/orderService');

const OrderServiceController = {
  async createOrderService(req, res) {
    try {
      const orderService = new OrderService(null, req.body.date, req.body.time, req.body.client_id, req.body.service_id, req.body.barber_id);
      await orderService.save();
      res.status(201).json({ message: 'Order service created successfully', orderService });
    } catch (err) {
      res.status(500).json({ error: 'Error creating order service', details: err.message });
    }
  },

  async getAllOrderServices(req, res) {
    try {
      const orderServices = await OrderService.getAll();
      res.status(200).json(orderServices);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all order services', details: err.message });
    }
  },

  async getOrderServiceById(req, res) {
    const { id } = req.params;
    try {
      const orderService = await OrderService.getById(id);
      if (!orderService) {
        res.status(404).json({ message: 'Order service not found' });
      } else {
        res.status(200).json(orderService);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching order service with ID ${id}`, details: err.message });
    }
  },

  async updateOrderService(req, res) {
    const { id } = req.params;
    try {
      const orderService = await OrderService.getById(id);
      if (!orderService) {
        res.status(404).json({ message: 'Order service not found' });
      } else {
        orderService.date = req.body.date;
        orderService.time = req.body.time;
        orderService.client_id = req.body.client_id;
        orderService.service_id = req.body.service_id;
        orderService.barber_id = req.body.barber_id;
        await orderService.update();
        res.status(200).json({ message: 'Order service updated successfully', orderService });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating order service with ID ${id}`, details: err.message });
    }
  },

  async deleteOrderService(req, res) {
    const { id } = req.params;
    try {
      const orderService = await OrderService.getById(id);
      if (!orderService) {
        res.status(404).json({ message: 'Order service not found' });
      } else {
        await orderService.delete();
        res.status(200).json({ message: 'Order service deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting order service with ID ${id}`, details: err.message });
    }
  }
};

module.exports = OrderServiceController;
