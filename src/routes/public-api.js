import express from 'express'
import userController from '../controller/userController.js'
import { logger } from '../application/logger.js'
import { Image } from '../model/Image.js'
import { upload } from '../middleware/multer-middleware.js'
import foodController from '../controller/foodController.js'
import drinkController from '../controller/drinkController.js'
import packageController from '../controller/packageController.js'
import bankController from '../controller/bankController.js'
import orderController from '../controller/orderController.js'

const publicApi = new express.Router()

publicApi.post('/login', userController.login)

publicApi.post('/register', userController.register)

publicApi.get('/food', foodController.get)

publicApi.get('/drink', drinkController.get)

publicApi.get('/package', packageController.get)

publicApi.get('/bank', bankController.get)

publicApi.post('/order', upload.single("dataImage"), orderController.create)

// publicApi.get('/get-image', async (req, res) => {
//     const image = await Image.findOne()

//     const base64Image = image.data.toString('base64');

//     res.status(200).json({
//         contentType: image.contentType,
//         data: base64Image,
//     });

// })

// publicApi.post('/upload-image', upload.single('image'), async (req, res) => {
//     if(req.file){
//         await Image.create({
//             data: req.file.buffer,
//             contentType: req.file.mimetype,
//         })

//         res.status(200).json({
//             message: "data terkirim"
//         })
//     }else{
//         res.status(200).json({
//             message: "data tidak terkirim"
//         })
//     }
// })

export {
    publicApi
}