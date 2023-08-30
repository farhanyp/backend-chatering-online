import { logger } from "../application/logger.js"
import { createValidation } from "../validation/drink-validation.js"
import { updateValidation } from "../validation/drink-validation.js"
import { validate } from "../validation/validation.js"
import { Drink } from '../model/Drink.js'

const create = async (username, request)=>{

    const createRequest = validate(createValidation, request)

    return Drink.create(createRequest)
}

const get = async (username, request)=>{

    return Drink.find()
}

const update = async (username, drinkId, request) => {

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

    const drink = await Drink.findOne({ _id: drinkId });

    if (!drink) {
        throw new ResponseError(404, "Food not found");
    }

    // if (request.categoryId) {
    //     if(product.categoryId != updateRequest.categoryId){

    //         await Category.updateOne({_id: product.categoryId}, {$pull:{productId: productId}})

    //         await Category.updateOne({_id: request.categoryId}, {$push:{productId: productId}})

    //     }

    //     data.categoryId = updateRequest.categoryId;
    // } 

    await Drink.findByIdAndUpdate(drinkId, data)

    return await Drink.findOne({
        _id: drinkId
    })

}


const remove = async (drinkId) => {

    return Drink.deleteOne({_id: drinkId})

}


export default{
    create,
    get,
    update,
    remove
}