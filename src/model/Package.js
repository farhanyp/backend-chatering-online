import mongoose from 'mongoose'

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
});

const Package = mongoose.model('Package', packageSchema);

export {Package};
