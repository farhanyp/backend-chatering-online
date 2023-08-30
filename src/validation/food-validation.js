import Joi from "joi"

const createValidation = Joi.object({
    dataImage: Joi.binary().max(20 * 1024 * 1024).required(),
    typeImage: Joi.string().min(1).required(),
    name: Joi.string().max(100).required(),
    qty: Joi.number().min(1).required(),
    price: Joi.number().min(1).required(),
    description: Joi.string().min(1).optional(),
})

const updateValidation = Joi.object({
    dataImage: Joi.binary().max(20 * 1024 * 1024).optional(),
    typeImage: Joi.string().min(1).optional(),
    name: Joi.string().max(100).optional(),
    qty: Joi.number().min(1).optional(),
    price: Joi.number().min(1).optional(),
    description: Joi.string().min(1).optional(),
})

export{
    createValidation,
    updateValidation
}