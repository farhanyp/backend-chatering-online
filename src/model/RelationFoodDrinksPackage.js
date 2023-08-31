import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const relationSchema = new mongoose.Schema({
  package: { type: ObjectId, ref: 'Package' },
  food: { type: ObjectId, required:false, ref: 'Food' },
  drink: { type: ObjectId, required:false, ref: 'Drink' },
});

const Relation = mongoose.model('Relation', relationSchema);

export {Relation};
