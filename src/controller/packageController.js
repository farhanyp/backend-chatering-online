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
        const resultTemp = await packageService.get();

        // logger.info(resultTemp.typeImage)
        const base64Image = resultTemp.dataImage.toString('base64');
        let result = {};

        // if (resultTemp.length > 0) {
        //     const packagesForRelation = resultTemp.map(a => a.relations);

        //     const  packages = await Relation.find({ _id: { $in: packagesForRelation } })
        //         .populate('package', 'dataImage typeImage name price description')
        //         .populate('food', 'dataImage typeImage name qty price description')
        //         .populate('drink', 'dataImage typeImage name qty price description');

        //     result = {
        //         packages
        //     };
        // } else {
        //     result = "data kosong";
        // }

        // logger.info(result.data.packages[0].package.dataImage.typeImage)
        // logger.info(result.packages[0].package.dataImage.type)
        // const base64Image = image.data.toString('base64');
        // result.packages[0].package.typeImage = "maman"

        res.status(200).json({
            contentType: resultTemp.typeImage,
            data: base64Image,
            // data: result
            // data: result.packages[0].package.typeImage
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