import ResponseError from "../error/response-error.js";
import foodService from "../service/foodService.js";

const create = async (req, res, next) => {
    try{

        const username = req.user

        const result = foodService.create(username, request)

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