import { logger } from "../application/logger.js";
import ResponseError from "../error/response-error.js";
import { Relation } from "../model/RelationFoodDrinksPackage.js";
import { Food } from "../model/Food.js";
import packageService from "../service/packageService.js";
import orderService from "../service/orderService.js";

const create = async (req, res, next) => {
    try{

        const request = req.body
        const user = req.user

        if(req.file){
            request.dataImage = req.file.buffer
            request.typeImage = req.file.mimetype
        }

        const result = await orderService.create(request, user)


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

        const resultCopy = JSON.parse(JSON.stringify(result));

        function bufferToBase64(buffer) {
            return Buffer.from(buffer).toString('base64');
          }

        for (const data of resultCopy) {
        if (data && data.dataImage) {
            data.dataImage = bufferToBase64(data.dataImage);
        }
        }

        res.status(200).json({
            data: resultCopy
        })

    }catch(e){
        next(e)
    }
}


export default{
    create,
    get
}