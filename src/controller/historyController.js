import historyService from "../service/historyService.js";

const get = async (req, res, next) => {
    try{
        const user = req.user   

        const result = await historyService.get(user)

        const resultCopy = JSON.parse(JSON.stringify(result));

        function bufferToBase64(buffer) {
            return Buffer.from(buffer).toString('base64');
          }

        for (const data of resultCopy) {
            if (data && data.history.dataImage) {
                data.history.dataImage = bufferToBase64(data.history.dataImage);
            }
        }

        // if(resultCopy.food){
        //     resultCopy.food.dataImage = bufferToBase64(resultCopy.food.dataImage);
        // }

        // if(resultCopy.drink){
        //     resultCopy.drink.dataImage = bufferToBase64(resultCopy.drink.dataImage);
        // }

        res.status(200).json({
            data: resultCopy
        })

    }catch(e){
        next(e)
    }
}

export default{
    get
}