import express from 'express'
import userController from '../controller/userController.js'

const publicApi = new express.Router()

publicApi.get('/', (req, res) => {
    res.send('public api!')
})

publicApi.post('/login', userController.login)

publicApi.post('/register', userController.register)

export {
    publicApi
}