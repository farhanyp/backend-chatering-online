import Joi from "joi"

const loginValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
})

const registerValidation = Joi.object({
    username: Joi.string().max(100).required(),
    address: Joi.string().min(1).required(),
    phoneNumber: Joi.string().max(100).required(),
    postalCode: Joi.string().min(1).required(),
    password: Joi.string().max(100).required(),
})

export{
    loginValidation,
    registerValidation
}