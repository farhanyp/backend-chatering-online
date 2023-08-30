import mongoose from "mongoose"

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
    description: {
        type: String,
        required: false,
    },
})

const Drink = mongoose.model("Drink", drinkSchema)

export{
    Drink
}