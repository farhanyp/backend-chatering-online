    import express from 'express'
    import mongoose from "mongoose"
    import { publicApi } from "../routes/public-api.js";
    import { apiRouter } from '../routes/api.js';
    import { errorMiddleware } from '../middleware/error-middleware.js'
    import bodyParser from 'body-parser';

    export const app = express();
    mongoose.connect('mongodb://localhost:27017/db_catering_online', { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err)
        });


    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json({ limit: '1024mb' }))

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    publicApi.get('/', (req, res) => {
        res.send('public api!')
    })

    app.use("/api/v1/member",publicApi)
    app.use("/api/v1/admin",apiRouter)


    app.use(errorMiddleware)


