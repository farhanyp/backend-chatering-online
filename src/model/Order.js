import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
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
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    foodId: [{
        type: ObjectId,
        required: true,
        ref: 'Food' 
    }],
    qtyFood:{
        type: Number,
        required: false
    },
    drinkId: [{
        type: ObjectId,
        required: false,
        ref: 'Food' 
    }],
    qtyDrink:{
        type: Number,
        required: false
    },
    created_at:{
        type: Date,
        required: false,
        default: Date.now
    }
})

orderSchema.pre('save', () => {
    if(!orderSchema.created_at){
        orderSchema.created_at = new Date()
    }
})

const Order = mongoose.model("Order", orderSchema)

export{
    Order
}