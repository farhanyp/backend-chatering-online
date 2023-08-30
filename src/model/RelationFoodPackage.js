const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
  food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
  drink: { type: mongoose.Schema.Types.ObjectId, ref: 'Drink' },
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
});

const Relation = mongoose.model('Relation', relationSchema);

module.exports = Relation;
