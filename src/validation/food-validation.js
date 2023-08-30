import Joi from "joi"

const createValidation = Joi.object({
    dataImage: Joi.required(),
    typeImage: Joi.string().min(1).required(),
    name: Joi.string().max(100).required(),
    qty: Joi.number().max(1).required(),
    description: Joi.string().min(1).optional(),
})

export{
    createValidation
}