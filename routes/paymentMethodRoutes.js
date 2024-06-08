const express = require('express');
const router = express.Router();
const PaymentMethodController = require('../controllers/paymentMethodController');

router.post('/payment_methods', PaymentMethodController.createPaymentMethod);
router.get('/payment_methods', PaymentMethodController.getAllPaymentMethods);
router.get('/payment_methods/:id', PaymentMethodController.getPaymentMethodById);
router.put('/payment_methods/:id', PaymentMethodController.updatePaymentMethod);
router.delete('/payment_methods/:id', PaymentMethodController.deletePaymentMethod);

module.exports = router;
