const express = require('express');
const router = express.Router();
const BarberController = require('../controllers/barberController');

router.post('/barbers', BarberController.createBarber);
router.get('/barbers', BarberController.getAllBarbers);
router.get('/barbers/:id', BarberController.getBarberById);
router.put('/barbers/:id', BarberController.updateBarber);
router.delete('/barbers/:id', BarberController.deleteBarber);
router.get('/barbers/:id/barber_shop', BarberController.getBarberShop);

module.exports = router;
