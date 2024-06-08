const express = require('express');
const router = express.Router();
const BarberLoginController = require('../controllers/barberLoginController');

router.post('/barber_logins', BarberLoginController.createBarberLogin);
router.get('/barber_logins', BarberLoginController.getAllBarberLogins);
router.get('/barber_logins/:id', BarberLoginController.getBarberLoginById);
router.put('/barber_logins/:id', BarberLoginController.updateBarberLogin);
router.delete('/barber_logins/:id', BarberLoginController.deleteBarberLogin);

module.exports = router;
