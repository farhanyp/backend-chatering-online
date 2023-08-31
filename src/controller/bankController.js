import { logger } from "../application/logger.js";
import ResponseError from "../error/response-error.js";
import { Relation } from "../model/RelationFoodDrinksPackage.js";
import { Food } from "../model/Food.js";
import packageService from "../service/packageService.js";
import bankService from "../service/bankService.js";

const create = async (req, res, next) => {
    try{

        const user = req.user
        const request = req.body

        if(user.role === "user"){
            throw new ResponseError(401, "User biasa tidak bisa mengakses")
        }

        const result = await bankService.create(request)

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }
}

const get = async (req, res, next) => {
    try{

        const result = await bankService.get()

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }
}

const update = async (req, res, next) => {
    try{

        const user = req.user
        const request = req.body
        const bankId = req.params.bankId

        if(user.role === "user"){
            throw new ResponseError(401, "User biasa tidak bisa mengakses")
        }

        const result = await bankService.update(bankId, request)

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }
}


const remove = async (req, res, next) => {
    try{

        const user = req.user
        const bankId = req.params.bankId

        if(user.role === "user"){
            throw new ResponseError(401, "User biasa tidak bisa mengakses")
        }

        const result = await bankService.remove(bankId)

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }
}


export default{
    create,
    get,
    update,
    remove
}