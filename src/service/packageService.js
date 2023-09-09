import { logger } from "../application/logger.js"
import { createPackageValidation } from "../validation/package-validation.js"
import { updatePackageValidation } from "../validation/package-validation.js"
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
        discount: createPackageRequest.discount,
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

    if(food){
        food.relations.push(relation._id)
        food.save()
    }

    if(drink){
        drink.relations.push(relation._id)
        drink.save()
    }

    if(newPackages){
        newPackages.relations.push(relation._id)
        newPackages.save()
    }

    return newPackages

}

const get = async (username, request)=>{

    const onlyPackage = await Package.find()

    const packagesForRelation = onlyPackage.map(a => a.relations);
    const  packages = await Relation.find({ _id: { $in: packagesForRelation } })
        .populate('package', 'dataImage typeImage name price discount description')
        .populate('food', 'dataImage typeImage name qty price description')
        .populate('drink', 'dataImage typeImage name qty price description');

    return packages

}


const update = async (username, packageId, request) => {

    const updateRequest = validate(updatePackageValidation, request)

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

    if(request.price){
        data.price = updateRequest.price
    }

    if(request.description){
        data.description = updateRequest.description
    } 

    if(request.description){
        data.description = updateRequest.description
    } 
    

    const packages = await Package.findOne({ _id: packageId });

    if (!packages) {
        throw new ResponseError(404, "Food not found");
    }


    if(request.foodId){

        const packagesForFood = await Package.findOne({ _id: packageId }).populate("relations", "food")

        const foodId = packagesForFood.relations.map( relation => relation.food)

        const relationsId = packagesForFood.relations.map( relation => relation.id)

        await Food.updateOne({_id: foodId}, { $pull: { relations: { $in: relationsId } } });

        data.foodId = updateRequest.foodId

        await Relation.updateOne({_id: relationsId}, {food: data.foodId})

        const food = await Food.findOne({_id: data.foodId})

        food.relations.push(relationsId)
        food.save()

    } 

    if(request.drinkId){

        const packagesForDrink = await Package.findOne({ _id: packageId }).populate("relations", "drink")

        const drinkId = packagesForDrink.relations.map( relation => relation.drink)

        const relationsId = packagesForDrink.relations.map( relation => relation.id)

        await Drink.updateOne({_id: drinkId}, { $pull: { relations: { $in: relationsId } } });

        data.drinkId = updateRequest.drinkId

        await Relation.updateOne({_id: relationsId}, {drink: data.drinkId})

        const drink = await Drink.findOne({_id: data.drinkId})

        drink.relations.push(relationsId)
        drink.save()
    }

    await Package.findByIdAndUpdate(packageId, {
        dataImage: updateRequest.dataImage,
        typeImage: updateRequest.typeImage,
        name: updateRequest.name,
        price: updateRequest.price,
        description: updateRequest.description,
    })

    return await Package.findOne({
        _id: packageId
    })

}


const remove = async (packageId) => {

    
    const packages = await Package.findOne({ _id: packageId }).populate("relations");
    logger.info(packages)
    
    if (!packages) {
        throw new ResponseError(404, "Package not found");
    }
    

    const foodId = packages.relations.map( pack => pack.food)
    const drinkId = packages.relations.map( pack => pack.drink)
    const relationsId = packages.relations.map( pack => pack.id)

    await Food.updateOne({_id: foodId}, { $pull: { relations: { $in: relationsId } } });
    await Drink.updateOne({_id: drinkId}, { $pull: { relations: { $in: relationsId } } });
    await Package.updateOne({_id: packageId}, { $pull: { relations: { $in: relationsId } } });
    await Relation.deleteOne({_id: relationsId})
    await Package.deleteOne({_id: packageId})

}


export default{
    create,
    get,
    update,
    remove
}