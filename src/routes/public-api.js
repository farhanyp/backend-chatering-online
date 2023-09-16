import express from 'express'
import userController from '../controller/userController.js'
import { upload } from '../middleware/multer-middleware.js'
import foodController from '../controller/foodController.js'
import drinkController from '../controller/drinkController.js'
import packageController from '../controller/packageController.js'
import bankController from '../controller/bankController.js'
import orderController from '../controller/orderController.js'
import historyController from '../controller/historyController.js'
import { authMiddleware } from '../middleware/auth-middleware.js'

const publicApi = new express.Router()

publicApi.post('/login', userController.login)

publicApi.post('/register', userController.register)

publicApi.get('/food', foodController.get)

publicApi.get('/drink', drinkController.get)

publicApi.get('/package', packageController.get)

publicApi.get('/bank', bankController.get)

publicApi.post('/order', authMiddleware, upload.single("dataImage"), orderController.create)

publicApi.get('/history', authMiddleware, historyController.get)

export {
    publicApi
}