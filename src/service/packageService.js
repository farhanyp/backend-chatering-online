import { logger } from "../application/logger.js"
import { createPackageValidation } from "../validation/package-validation.js"
import { validate } from "../validation/validation.js"
import { Package } from "../model/Package.js"
import { Relation } from "../model/RelationFoodDrinksPackage.js"
import { Food } from "../model/Food.js"
import { Drink } from "../model/Drink.js"

const create = async (username, request)=>{

    const createPackageRequest = validate(createPackageValidation, request)

    const packages = await Package.create({
        dataImage: createPackageRequest.dataImage,
        typeImage: createPackageRequest.typeImage,
        name: createPackageRequest.name,
        price: createPackageRequest.price,
        description: createPackageRequest.description,
    })

    const food = await Food.findOne({_id: createPackageRequest.foodId})
    const drink = await Drink.findOne({_id: createPackageRequest.drinkId})
    const newPackages = await Package.findOne({_id: packages.id})

     const relation  = await Relation.create({
        package: packages.id,
        food: createPackageRequest.foodId,
        drink: createPackageRequest.drinkId,
    })

    food.relations.push(relation._id)
    food.save()

    drink.relations.push(relation._id)
    drink.save()

    newPackages.relations.push(relation._id)
    newPackages.save()

    return newPackages

}


export default{
    create,

}