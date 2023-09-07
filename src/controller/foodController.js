import { logger } from "../application/logger.js";
import ResponseError from "../error/response-error.js";
import foodService from "../service/foodService.js";

const create = async (req, res, next) => {
    try{

        const user = req.user
        const request = req.body

        if(req.file){
            request.dataImage = req.file.buffer
            request.typeImage = req.file.mimetype
        }

        if(user.role === "user"){
            throw new ResponseError(401, "User biasa tidak bisa mengakses")
        }

        const result = await foodService.create(user.username, request)

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }
}

const get = async (req, res, next) => {
    try{

        // const result = await foodService.get()

        // const resultCopy = JSON.parse(JSON.stringify(result));

        // function bufferToBase64(buffer) {
        //     return Buffer.from(buffer).toString('base64');
        //   }

        //   for (const data of resultCopy) {
        //     if (data && data.dataImage) {
        //       data.dataImage = bufferToBase64(data.dataImage);
        //     }
        //   }

        res.status(200).json({
            data: "resultCopy"
        })

    }catch(e){
        next(e)
    }
}

const update = async (req, res, next) => {
    try{

        const user = req.user
        const request = req.body
        const foodId = req.params.foodId

        if(req.file){
            request.dataImage = req.file.buffer
            request.typeImage = req.file.mimetype
        }

        if(user.role === "user"){
            throw new ResponseError(401, "User biasa tidak bisa mengakses")
        }

        const result = await foodService.update(user.username, foodId, request)

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
        const foodId = req.params.foodId

        if(user.role === "user"){
            throw new ResponseError(401, "User biasa tidak bisa mengakses")
        }

        const result = await foodService.remove(foodId)

        res.status(200).json({
            data: "Data Terhapus"
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