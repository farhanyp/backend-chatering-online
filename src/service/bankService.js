import { logger } from "../application/logger.js"
import { createBankValidation } from "../validation/bank-validation.js"
import { updateBankValidation } from "../validation/bank-validation.js"
import { validate } from "../validation/validation.js"
import { Bank } from "../model/Bank.js"

const create = async (request)=>{

    const createBankRequest = validate(createBankValidation, request)

    return await Bank.create(request)

}

const get = async ()=>{

    return await Bank.find()

}


const update = async (bankId, request) => {

    const updateRequest = validate(updateBankValidation, request)

    const data = {}
    if(request.name){
        data.name = updateRequest.name
    }

    if(request.noRek){
        data.noRek = updateRequest.noRek
    }

    if(request.nameBank){
        data.nameBank = updateRequest.nameBank
    }

    await Bank.findByIdAndUpdate(bankId, data)

    return Bank.findOne({
        _id: bankId
    })

}

const remove = async (bankId)=>{

    return await Bank.deleteOne({_id: bankId})

}


export default{
    create,
    get,
    update,
    remove
}