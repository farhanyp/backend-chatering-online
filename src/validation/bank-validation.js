import Joi from "joi"

const createBankValidation = Joi.object({
    name: Joi.string().max(100).required(),
    noRek: Joi.string().max(255).required(),
    nameBank: Joi.string().max(100).required(),
})

const updateBankValidation = Joi.object({
    name: Joi.string().max(100).optional(),
    noRek: Joi.string().max(255).optional(),
    nameBank: Joi.string().max(100).optional(),
})

export{
    createBankValidation,
    updateBankValidation
}