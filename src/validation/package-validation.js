import Joi from "joi"

const createPackageValidation = Joi.object({
    dataImage: Joi.binary().max(20 * 1024 * 1024).required(),
    typeImage: Joi.string().min(1).required(),
    name: Joi.string().max(100).required(),
    price: Joi.string().min(1).required(),
    description: Joi.string().min(1).optional(),
    foodId: Joi.string().min(1).optional(),
    drinkId: Joi.string().min(1).optional(),
})

export{
    createPackageValidation
}