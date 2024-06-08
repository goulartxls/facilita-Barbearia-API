const Payment = require('../models/payment');

const PaymentController = {
  async createPayment(req, res) {
    try {
      const payment = new Payment(null, req.body.order_id, req.body.payment_method_id, req.body.amount, req.body.payment_date);
      await payment.save();
      res.status(201).json({ message: 'Payment created successfully', payment });
    } catch (err) {
      res.status(500).json({ error: 'Error creating payment', details: err.message });
    }
  },

  async getAllPayments(req, res) {
    try {
      const payments = await Payment.getAll();
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all payments', details: err.message });
    }
  },

  async getPaymentById(req, res) {
    const { id } = req.params;
    try {
      const payment = await Payment.getById(id);
      if (!payment) {
        res.status(404).json({ message: 'Payment not found' });
      } else {
        res.status(200).json(payment);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching payment with ID ${id}`, details: err.message });
    }
  },

  async updatePayment(req, res) {
    const { id } = req.params;
    try {
      const payment = await Payment.getById(id);
      if (!payment) {
        res.status(404).json({ message: 'Payment not found' });
      } else {
        payment.order_id = req.body.order_id;
        payment.payment_method_id = req.body.payment_method_id;
        payment.amount = req.body.amount;
        payment.payment_date = req.body.payment_date;
        await payment.update();
        res.status(200).json({ message: 'Payment updated successfully', payment });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating payment with ID ${id}`, details: err.message });
    }
  },

  async deletePayment(req, res) {
    const { id } = req.params;
    try {
      const payment = await Payment.getById(id);
      if (!payment) {
        res.status(404).json({ message: 'Payment not found' });
      } else {
        await payment.delete();
        res.status(200).json({ message: 'Payment deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting payment with ID ${id}`, details: err.message });
    }
  }
};

module.exports = PaymentController;
