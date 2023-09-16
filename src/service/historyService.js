import { Drink } from "../model/Drink.js";
import { Food } from "../model/Food.js";
import { RelationHistory } from "../model/RelationUserHistoryOrder.js";
import { User } from "../model/User.js"


const get = async (user)=>{

    const UserFind = await User.findOne({_id: user._id})

    let data = {}

    if(UserFind){
        const UserFindForRelations = UserFind.relations.map(history => history)
        const  histories = await RelationHistory.find({_id: UserFindForRelations})
            .populate('history')

        data.history = histories

        const foodForRelations = histories.map( history => history.history.foodId)
        if(foodForRelations[0].length == 0){
            const food = await Food.findOne({_id: foodForRelations})
            data.food = food
        }

        const drinkForRelations = histories.map( history => history.history.drinkId)
        if(drinkForRelations[0].length === 0){
            const drink = await Drink.findOne({_id: drinkForRelations})
            data.drink = drink
        }

    }

    return data
}

export default{
    get
}
