import { logger } from "../application/logger.js"
import { createOrderValidation } from "../validation/order-validation.js"
import { validate } from "../validation/validation.js"
import { Food } from '../model/Food.js'
import { Drink } from '../model/Drink.js'
import ResponseError from "../error/response-error.js"
import { Order } from "../model/Order.js"
import { RelationHistory } from "../model/RelationUserHistoryOrder.js"
import { History } from "../model/History.js"
import { User } from "../model/User.js"

const create = async (request, user)=>{

    const createRequest = validate(createOrderValidation, request)

    if(createRequest.foodId && createRequest.drinkId){
        const food = await Food.findOne({_id: createRequest.foodId})
        const drink = await Drink.findOne({_id: createRequest.drinkId})
    
        const OperationQtyFood = food.qty - createRequest.qtyFood
        const OperationQtyDrink = drink.qty - createRequest.qtyDrink
    
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
    
    const order = await Order.create({
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

    const history = await History.create({
        dataImage: createRequest.dataImage,
        typeImage: createRequest.typeImage,
        name: createRequest.name,
        address: createRequest.address,
        phone: createRequest.phone,
        totalPrice: createRequest.totalPrice,
        foodId: createRequest.foodId,
        qtyFood: createRequest.qtyFood,
        drinkId: createRequest.drinkId,
        qtyDrink: createRequest.qtyDrink,
        status: true,
        orderId: order._id
    })

    const UserFind = await User.findOne({_id: user._id})

    const relations = await RelationHistory.create({
        user: UserFind._id,
        history: history._id
    })

    if(UserFind){
        UserFind.relations.push(relations._id)
        UserFind.save()
    }

    if(history){
        history.relations.push(relations._id)
        history.save()
    }
    
    return UserFind
}

const get = async ()=>{

    return await Order.find()

}

export default{
    create,
    get
}