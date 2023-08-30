import mongoose from "mongoose"
import { logger } from "../application/logger";
import { User } from "../model/User";
import { Image } from "../model/Image";
import { Food } from "../model/Food";
import path from 'path'

export const connectMongoDB = async () => {

    // mongoose.connect('mongodb+srv://farhanyp:945921@cluster0.av5vcrp.mongodb.net/db_catering_online', { useNewUrlParser: true, useUnifiedTopology: true})
    //     .then(() => {
    //         console.log('Connected to MongoDB')
    //     })
    //     .catch((err) => {
    //         console.error('Error connecting to MongoDB:', err)
    //     });

    mongoose.connect('mongodb://localhost:27017/db_catering_online', { useNewUrlParser: true, useUnifiedTopology: true})
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
    return await User.create({
        username: "user1",
        password : "user1",
        role: "user",
        token: "user"
    })
}

export const deleteUser = async () => {
    return await User.deleteOne({username: "user1"});
}


export const getAdmin = async () => {
    return await User.findOne({username: "admin-catering-online"})
}

export const getUser = async () => {
    return await User.findOne({username: "user1"})
}

export const createFood = async () => {
    const sampleImagePaths = [
        "sample1.jpg",
        "sample2.jpg",
        "sample3.jpg",
        "sample4.jpg",
        "sample5.jpg",
    ];
      
    for (const imagePath of sampleImagePaths) {;

        await Food.create({
            dataImage: path.join(__dirname, "sample.jpeg"),
            typeImage: "image/jpeg",
            name: `Sample Food ${sampleImagePaths.indexOf(imagePath) + 1}`,
            qty: 1,
            price: 1000,
            description: "This is a sample food item.",
    });
}
}

export const createOneFood = async () => {
    
    await Food.create({
        dataImage: path.join(__dirname, "sample.jpeg"),
        typeImage: "image/jpeg",
        name: `Sample Food 1`,
        qty: 1,
        price: 1000,
        description: "This is a sample food item.",
    });
}

export const getOneFood = async () => {
    return Food.findOne()
}

export const deleteFood = async () => {
    return Food.deleteMany()
}