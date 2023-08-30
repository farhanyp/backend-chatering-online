import { logger } from "../application/logger.js";
import ResponseError from "../error/response-error.js";
import packageService from "../service/packageService.js";

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

        const result = await packageService.create(user.username, request)

        res.status(200).json({
            data: result
        })

    }catch(e){
        next(e)
    }
}

export default{
    create
}