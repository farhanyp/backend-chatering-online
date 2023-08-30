const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
