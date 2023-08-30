import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware.js'
import FoodController from '../controller/FoodController.js'

const apiRouter = new express.Router()

apiRouter.use(authMiddleware)

apiRouter.post('/product/create', FoodController.create)

export {
    apiRouter
}

