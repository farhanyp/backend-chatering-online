import { loginValidation } from "../validation/user-validation.js"
import { registerValidation } from "../validation/user-validation.js"
import {validate} from "../validation/validation.js"
import { User } from "../model/User.js"
import ResponseError from "../error/response-error.js"
import bcrypt from 'bcrypt'
import { v4 as uuid } from "uuid"
import { logger } from "../application/logger.js"

const login = async(request) => {
    const loginRequest = validate(loginValidation, request)

    const user = await User.findOne({username: loginRequest.username})

    if(!user){
        throw new ResponseError(401, "Username or password wrong")
    }
    
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)
    
    if(!isPasswordValid){
        throw new ResponseError(401, "Username or password wrong")
    }

    const token = uuid().toString()

    await User.updateOne({username: user.username}, {token: token})

    return User.findOne({username: user.username}).select('role').select('token')
}


const register = async(request) => {
    const registerRequest = validate(registerValidation, request)

    const user = await User.findOne({username: registerRequest.username})
    
    if(user){
        throw new ResponseError(401, "Username sudah dipakai");
    }

    const token = uuid().toString()
    registerRequest.token = token

    return User.create(registerRequest)

}

export default{
    login,
    register
}