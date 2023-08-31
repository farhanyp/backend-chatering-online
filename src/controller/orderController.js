import { logger } from "../application/logger.js";
import ResponseError from "../error/response-error.js";
import { Relation } from "../model/RelationFoodDrinksPackage.js";
import { Food } from "../model/Food.js";
import packageService from "../service/packageService.js";
import orderService from "../service/orderService.js";

const create = async (req, res, next) => {
    try{

        const request = req.body

        if(req.file){
            request.dataImage = req.file.buffer
            request.typeImage = req.file.mimetype
        }

        const result = await orderService.create(request)

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }
}

const get = async (req, res, next) => {
    try{
        const user = req.user

        if(user.role === "user"){
            throw new ResponseError(401, "User biasa tidak bisa mengakses")
        }

        const result = await orderService.get()

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }
}


export default{
    create,
    get
}