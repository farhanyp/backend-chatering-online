import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema;

const drinkSchema = new mongoose.Schema({
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
        required: true,
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    relations: [{ 
        type: ObjectId, 
        ref: 'Relation' 
    }]
})

const Drink = mongoose.model("Drink", drinkSchema)

export{
    Drink
}