const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  plate: { type: String, required: true, unique: true },
  type: { type: String, enum: ['car', 'motorcycle'], required: true },
  entryTime: { type: Date, default: Date.now },
  exitTime: { type: Date }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);