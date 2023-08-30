import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema;

const packageSchema = new mongoose.Schema({
  dataImage:{
    type: Buffer,
    required: true,
},
typeImage:{
    type: String,
    required: true,
},
  name: {
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  relations: [{ 
    type: ObjectId, 
    ref: 'Relation' 
}]
});

const Package = mongoose.model('Package', packageSchema);

export {Package};
