const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

router.post('/payments', PaymentController.createPayment);
router.get('/payments', PaymentController.getAllPayments);
router.get('/payments/:id', PaymentController.getPaymentById);
router.put('/payments/:id', PaymentController.updatePayment);
router.delete('/payments/:id', PaymentController.deletePayment);

module.exports = router;
