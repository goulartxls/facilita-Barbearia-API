const OrderProduct = require('../models/orderProduct');

const OrderProductController = {
  async createOrderProduct(req, res) {
    try {
      const orderProduct = new OrderProduct(null, req.body.date, req.body.client_id, req.body.product_id, req.body.quantity, req.body.price);
      await orderProduct.save();
      res.status(201).json({ message: 'Order product created successfully', orderProduct });
    } catch (err) {
      res.status(500).json({ error: 'Error creating order product', details: err.message });
    }
  },

  async getAllOrderProducts(req, res) {
    try {
      const orderProducts = await OrderProduct.getAll();
      res.status(200).json(orderProducts);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all order products', details: err.message });
    }
  },

  async getOrderProductById(req, res) {
    const { id } = req.params;
    try {
      const orderProduct = await OrderProduct.getById(id);
      if (!orderProduct) {
        res.status(404).json({ message: 'Order product not found' });
      } else {
        res.status(200).json(orderProduct);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching order product with ID ${id}`, details: err.message });
    }
  },

  async updateOrderProduct(req, res) {
    const { id } = req.params;
    try {
      const orderProduct = await OrderProduct.getById(id);
      if (!orderProduct) {
        res.status(404).json({ message: 'Order product not found' });
      } else {
        orderProduct.date = req.body.date;
        orderProduct.client_id = req.body.client_id;
        orderProduct.product_id = req.body.product_id;
        orderProduct.quantity = req.body.quantity;
        orderProduct.price = req.body.price;
        await orderProduct.update();
        res.status(200).json({ message: 'Order product updated successfully', orderProduct });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating order product with ID ${id}`, details: err.message });
    }
  },

  async deleteOrderProduct(req, res) {
    const { id } = req.params;
    try {
      const orderProduct = await OrderProduct.getById(id);
      if (!orderProduct) {
        res.status(404).json({ message: 'Order product not found' });
      } else {
        await orderProduct.delete();
        res.status(200).json({ message: 'Order product deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting order product with ID ${id}`, details: err.message });
    }
  }
};

module.exports = OrderProductController;
