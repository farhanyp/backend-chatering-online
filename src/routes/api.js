import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware.js'
import foodController from '../controller/foodController.js'
import drinkController from '../controller/drinkController.js'
import packageController from '../controller/packageController.js'
import { upload } from '../middleware/multer-middleware.js'

const apiRouter = new express.Router()

apiRouter.use(authMiddleware)

apiRouter.post('/food/create', upload.single("dataImage"), foodController.create)
apiRouter.patch('/food/:foodId', upload.single("dataImage"), foodController.update)
apiRouter.delete('/food/:foodId', foodController.remove)

apiRouter.post('/drink/create', upload.single("dataImage"), drinkController.create)
apiRouter.patch('/drink/:drinkId', upload.single("dataImage"), drinkController.update)
apiRouter.delete('/drink/:drinkId', drinkController.remove)

apiRouter.post('/package/create', upload.single("dataImage"), packageController.create)

export {
    apiRouter
}

