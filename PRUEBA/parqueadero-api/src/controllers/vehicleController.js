const Vehicle = require('../models/vehicle');

const MAX_CARS = 5;
const MAX_MOTORCYCLES = 10;

// Guarda el vehiculo en la base de datos
exports.createVehicle = async (req, res) => {
  try {
    const { plate, type } = req.body;

    // Verificar disponibilidad de espacios
    const count = await Vehicle.countDocuments({ type, exitTime: null });
    if ((type === 'car' && count >= MAX_CARS) || (type === 'motorcycle' && count >= MAX_MOTORCYCLES)) {
      return res.status(400).json({ message: 'No hay espacios disponibles para este tipo de vehículo' });
    }

    const vehicle = new Vehicle({ plate, type });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los vehiculos
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtiene un vehículo específico por su placa
exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ plate: req.params.plate });
    if (!vehicle) return res.status(404).json({ message: 'Vehículo no encontrado' });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualiza la hora de salida y demás actualizaciones del vehiculo por su placa
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ plate: req.params.plate });
    if (!vehicle) return res.status(404).json({ message: 'Vehículo no encontrado' });

    if (req.body.exitTime) {
      vehicle.exitTime = req.body.exitTime;
    }

    await vehicle.save();
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un vehiculo de la base de datos
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ plate: req.params.plate });
    if (!vehicle) return res.status(404).json({ message: 'Vehículo no encontrado' });
    res.json({ message: 'Vehículo eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};