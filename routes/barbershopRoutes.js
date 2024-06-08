const express = require('express');
const router = express.Router();
const BarberShopController = require('../controllers/barbershopController');

router.post('/barber_shops', BarberShopController.createBarberShop);
router.get('/barber_shops', BarberShopController.getAllBarberShops);
router.get('/barber_shops/:id', BarberShopController.getBarberShopById);
router.put('/barber_shops/:id', BarberShopController.updateBarberShop);
router.delete('/barber_shops/:id', BarberShopController.deleteBarberShop);

module.exports = router;
