import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const relationSchema = new mongoose.Schema({
  user: { type: ObjectId, required:false, ref: 'User' },
  history: { type: ObjectId, required:false, ref: 'History' },
});

const RelationHistory = mongoose.model('RelationHistory', relationSchema);

export {RelationHistory};
