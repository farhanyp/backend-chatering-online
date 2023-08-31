import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    noRek: {
        type: String,
        required: true,
    },
    nameBank: {
        type: String,
        required: true,
    },
})

const Bank = mongoose.model("Bank", userSchema)

export{
    Bank
}