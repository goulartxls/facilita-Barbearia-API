const PaymentMethod = require('../models/paymentMethod');

const PaymentMethodController = {
  async createPaymentMethod(req, res) {
    try {
      const paymentMethod = new PaymentMethod(null, req.body.name, req.body.description, req.body.taxes);
      await paymentMethod.save();
      res.status(201).json({ message: 'Payment method created successfully', paymentMethod });
    } catch (err) {
      res.status(500).json({ error: 'Error creating payment method', details: err.message });
    }
  },

  async getAllPaymentMethods(req, res) {
    try {
      const paymentMethods = await PaymentMethod.getAll();
      res.status(200).json(paymentMethods);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all payment methods', details: err.message });
    }
  },

  async getPaymentMethodById(req, res) {
    const { id } = req.params;
    try {
      const paymentMethod = await PaymentMethod.getById(id);
      if (!paymentMethod) {
        res.status(404).json({ message: 'Payment method not found' });
      } else {
        res.status(200).json(paymentMethod);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching payment method with ID ${id}`, details: err.message });
    }
  },

  async updatePaymentMethod(req, res) {
    const { id } = req.params;
    try {
      const paymentMethod = await PaymentMethod.getById(id);
      if (!paymentMethod) {
        res.status(404).json({ message: 'Payment method not found' });
      } else {
        paymentMethod.name = req.body.name;
        paymentMethod.description = req.body.description;
        paymentMethod.taxes = req.body.taxes;
        await paymentMethod.update();
        res.status(200).json({ message: 'Payment method updated successfully', paymentMethod });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating payment method with ID ${id}`, details: err.message });
    }
  },

  async deletePaymentMethod(req, res) {
    const { id } = req.params;
    try {
      const paymentMethod = await PaymentMethod.getById(id);
      if (!paymentMethod) {
        res.status(404).json({ message: 'Payment method not found' });
      } else {
        await paymentMethod.delete();
        res.status(200).json({ message: 'Payment method deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting payment method with ID ${id}`, details: err.message });
    }
  }
};

module.exports = PaymentMethodController;
