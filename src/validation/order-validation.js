import Joi from "joi"

const createOrderValidation = Joi.object({
    dataImage: Joi.binary().max(20 * 1024 * 1024).required(),
    typeImage: Joi.string().min(1).required(),
    name: Joi.string().max(100).required(),
    address: Joi.string().max(100).required(),
    qtyFood: Joi.number().min(1).optional(),
    qtyDrink: Joi.number().min(1).optional(),
    totalPrice: Joi.number().min(1).required(),
    foodId: Joi.string().optional(),
    drinkId: Joi.string().optional(),
})

export{
    createOrderValidation
}