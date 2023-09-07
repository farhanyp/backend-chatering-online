import { logger } from "../application/logger.js"
import { createValidation } from "../validation/food-validation.js"
import { updateValidation } from "../validation/food-validation.js"
import { validate } from "../validation/validation.js"
import { Food } from '../model/Food.js'

const create = async (username, request)=>{

    const createRequest = validate(createValidation, request)

    return Food.create(createRequest)
}

const get = async (username, request)=>{

    // return await Food.find()
    return "hai"
}

const update = async (username, foodId, request) => {

    const updateRequest = validate(updateValidation, request)

    const data = {}
    if(request.dataImage){
        data.dataImage = updateRequest.dataImage
    }

    if(request.typeImage){
        data.typeImage = updateRequest.typeImage
    }

    if(request.name){
        data.name = updateRequest.name
    }

    if(request.qty){
        data.qty = updateRequest.qty
    } 

    if(request.price){
        data.price = updateRequest.price
    }

    if(request.description){
        data.description = updateRequest.description
    } 

    const food = await Food.findOne({ _id: foodId });

    if (!food) {
        throw new ResponseError(404, "Food not found");
    }

    await Food.findByIdAndUpdate(foodId, data)

    return await Food.findOne({
        _id: foodId
    })

}


const remove = async (foodId) => {

    return Food.deleteOne({_id: foodId})

}


export default{
    create,
    get,
    update,
    remove
}