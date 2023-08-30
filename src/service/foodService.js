import { createValidation } from "../validation/food-validation.js"
import { validate } from "../validation/validation.js"

const create = async (username, request)=>{

    const createRequest = validate(createValidation, request)


}

export default{
    create
}