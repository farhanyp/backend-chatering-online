import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware.js'
import foodController from '../controller/foodController.js'
import { upload } from '../middleware/multer-middleware.js'

const apiRouter = new express.Router()

apiRouter.use(authMiddleware)

apiRouter.post('/food/create', upload.single("dataImage"), foodController.create)
apiRouter.patch('/food/:foodId', upload.single("dataImage"), foodController.update)
apiRouter.delete('/food/:foodId', foodController.remove)

export {
    apiRouter
}

