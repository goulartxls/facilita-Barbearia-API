const Order = require('../models/order');

const OrderController = {
  async createOrder(req, res) {
    try {
      const order = new Order(null, req.body.date, req.body.client_id);
      await order.save();
      res.status(201).json({ message: 'Order created successfully', order });
    } catch (err) {
      res.status(500).json({ error: 'Error creating order', details: err.message });
    }
  },

  async getAllOrders(req, res) {
    try {
      const orders = await Order.getAll();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all orders', details: err.message });
    }
  },

  async getOrderById(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.getById(id);
      if (!order) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        res.status(200).json(order);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching order with ID ${id}`, details: err.message });
    }
  },

  async updateOrder(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.getById(id);
      if (!order) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        order.date = req.body.date;
        order.client_id = req.body.client_id;
        await order.update();
        res.status(200).json({ message: 'Order updated successfully', order });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating order with ID ${id}`, details: err.message });
    }
  },

  async deleteOrder(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.getById(id);
      if (!order) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        await order.delete();
        res.status(200).json({ message: 'Order deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting order with ID ${id}`, details: err.message });
    }
  }
};

module.exports = OrderController;