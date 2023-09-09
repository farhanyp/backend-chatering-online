import { logger } from "../application/logger.js"
import { createOrderValidation } from "../validation/order-validation.js"
import { validate } from "../validation/validation.js"
import { Food } from '../model/Food.js'
import { Drink } from '../model/Drink.js'
import ResponseError from "../error/response-error.js"
import { Order } from "../model/Order.js"

const create = async (request)=>{

    const createRequest = validate(createOrderValidation, request)

    if(createRequest.foodId && createRequest.drinkId){
        const food = await Food.findOne({_id: createRequest.foodId})
        const drink = await Drink.findOne({_id: createRequest.drinkId})
    
        const OperationQtyFood = food.qty - createRequest.qtyFood
        const OperationQtyDrink = drink.qty - createRequest.qtyDrink
    
        if(food.qty < createRequest.qtyFood){
            throw new ResponseError(401, `Jumlah ${food.name} tidak mencukup`)
        }
    
        if(drink.qty < createRequest.qtyDrink){
            throw new ResponseError(401, `Jumlah ${drink.name} tidak mencukup`)
        }
        await Food.updateOne({_id: createRequest.foodId}, {qty: OperationQtyFood})
        await Drink.updateOne({_id: createRequest.drinkId}, {qty: OperationQtyDrink})
    }

    if(createRequest.foodId && !createRequest.drinkId){
        const food = await Food.findOne({_id: createRequest.foodId})
        const OperationFood = food.price * createRequest.qtyFood

        const OperationQtyFood = food.qty - createRequest.qtyFood
        if(food.qty < createRequest.qtyFood){
            throw new ResponseError(401, `Jumlah ${food.name} tidak mencukup`)
        }
        await Food.updateOne({_id: createRequest.foodId}, {qty: OperationQtyFood})
    }
    if(!createRequest.foodId && createRequest.drinkId){
        const drink = await Drink.findOne({_id: createRequest.drinkId})
        const OperationDrink = drink.price * createRequest.qtyDrink

        const OperationQtyDrink = drink.qty - createRequest.qtyDrink
        if(drink.qty < createRequest.qtyDrink){
            throw new ResponseError(401, `Jumlah ${drink.name} tidak mencukup`)
        }
        await Drink.updateOne({_id: createRequest.drinkId}, {qty: OperationQtyDrink})
    }
    
    return Order.create({
        dataImage: createRequest.dataImage,
        typeImage: createRequest.typeImage,
        name: createRequest.name,
        address: createRequest.address,
        phone: createRequest.phone,
        totalPrice: createRequest.totalPrice,
        foodId: createRequest.foodId,
        qtyFood: createRequest.qtyFood,
        drinkId: createRequest.drinkId,
        qtyDrink: createRequest.qtyDrink
    })
}

const get = async ()=>{

    return await Order.find()

}


export default{
    create,
    get
}