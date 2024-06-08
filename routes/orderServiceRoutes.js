const express = require('express');
const router = express.Router();
const OrderServiceController = require('../controllers/orderServiceController');

router.post('/order_services', OrderServiceController.createOrderService);
router.get('/order_services', OrderServiceController.getAllOrderServices);
router.get('/order_services/:id', OrderServiceController.getOrderServiceById);
router.put('/order_services/:id', OrderServiceController.updateOrderService);
router.delete('/order_services/:id', OrderServiceController.deleteOrderService);

module.exports = router;
