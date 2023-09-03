import { logger } from "../application/logger.js";
import ResponseError from "../error/response-error.js";
import { Relation } from "../model/RelationFoodDrinksPackage.js";
import { Food } from "../model/Food.js";
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

const get = async (req, res, next) => {
    try {
        const result = await packageService.get();

        const resultCopy = JSON.parse(JSON.stringify(result));


        function bufferToBase64(buffer) {
            return Buffer.from(buffer).toString('base64');
          }

          for (const data of resultCopy) {
            if (data.package && data.package.dataImage) {
              data.package.dataImage = bufferToBase64(data.package.dataImage);
            }

            if (data.drink && data.drink.dataImage) {
                data.drink.dataImage = bufferToBase64(data.drink.dataImage);
              }
          }

        res.status(200).json({
            data: resultCopy
        });
    } catch (e) {
        next(e);
    }
};



const update = async (req, res, next) => {
    try{

        const user = req.user
        const request = req.body
        const packageId = req.params.packageId

        if(req.file){
            request.dataImage = req.file.buffer
            request.typeImage = req.file.mimetype
        }

        if(user.role === "user"){
            throw new ResponseError(401, "User biasa tidak bisa mengakses")
        }

        const result = await packageService.update(user.username, packageId, request)


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
        const packageId = req.params.packageId

        if(user.role === "user"){
            throw new ResponseError(401, "User biasa tidak bisa mengakses")
        }

        const result = await packageService.remove(packageId)


        res.status(200).json({
            data: "Data sudah dihapus"
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