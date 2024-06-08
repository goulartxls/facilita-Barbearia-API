const express = require('express');
const router = express.Router();
const OrderProductController = require('../controllers/orderProductController');

router.post('/order_products', OrderProductController.createOrderProduct);
router.get('/order_products', OrderProductController.getAllOrderProducts);
router.get('/order_products/:id', OrderProductController.getOrderProductById);
router.put('/order_products/:id', OrderProductController.updateOrderProduct);
router.delete('/order_products/:id', OrderProductController.deleteOrderProduct);

module.exports = router;
