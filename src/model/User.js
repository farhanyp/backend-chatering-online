import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    alamat:{
        type: String,
        required: true
    },
    nohp:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    token: {
        type: String,
        required: false
    }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

export{
    User
}