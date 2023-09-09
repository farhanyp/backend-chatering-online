import Joi from "joi"

const loginValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
})

const registerValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    address: Joi.string().min(1).required(),
    phone: Joi.string().min(1).required()
})

export{
    loginValidation,
    registerValidation
}