const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getVehicles);
router.get('/:plate', vehicleController.getVehicle);
router.put('/:plate', vehicleController.updateVehicle);
router.delete('/:plate', vehicleController.deleteVehicle);

module.exports = router;