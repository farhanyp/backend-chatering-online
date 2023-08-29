import mongoose from "mongoose"
import { logger } from "../application/logger";
import { User } from "../model/User";

export const connectMongoDB = async () => {

    // const DB_URL = 'mongodb://127.0.0.1:27017/db_salon_hewan';
    //     mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    //     .then(() => {
    //         console.log('Connected to MongoDB')
    //     })
    //     .catch((err) => {
    //         console.error('Error connecting to MongoDB:', err)
    //     });

    mongoose.connect('mongodb://localhost:27017/db_salon_hewan', { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err)
        });

}

export const closedMongoDB = async () => {

    await mongoose.connection.close();

}

export const createUser = async () => {
    return User.create({
        username: "user1",
        password : "user1"
    })
}

export const deleteUser = async () => {
    return await User.deleteOne({username: "user1"});
}


export const getUser = async () => {
    return await User.findOne({username: "admin-salon-hewan-admin"})
}