import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema;

const historySchema = new mongoose.Schema({
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
        required: false,
        ref: 'Food' 
    }],
    qtyFood:{
        type: Number,
        required: false
    },
    drinkId: [{
        type: ObjectId,
        required: false,
        ref: 'Drink' 
    }],
    qtyDrink:{
        type: Number,
        required: false
    },
    status: {
        type: Boolean, 
        required: true
    },
    orderId: {
        type: ObjectId, 
        ref: 'Order'
    },
    relations: [{
        type: ObjectId, 
        ref: 'RelationHistory' 
    }],
    created_at:{
        type: Date,
        required: false,
        default: Date.now
    }
})

historySchema.pre('save', () => {
    if(!historySchema.created_at){
        historySchema.created_at = new Date()
    }
})

const History = mongoose.model("History", historySchema)

export{
    History
}