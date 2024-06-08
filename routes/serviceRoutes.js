const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/serviceController');

router.post('/services', ServiceController.createService);
router.get('/services', ServiceController.getAllServices);
router.get('/services/:id', ServiceController.getServiceById);
router.put('/services/:id', ServiceController.updateService);
router.delete('/services/:id', ServiceController.deleteService);

module.exports = router;
