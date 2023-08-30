import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
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

const Food = mongoose.model("Food", foodSchema)

export{
    Food
}