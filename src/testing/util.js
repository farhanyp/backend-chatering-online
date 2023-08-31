import mongoose from "mongoose"
import { logger } from "../application/logger.js";
import { User } from "../model/User.js";
import { Image } from "../model/Image.js";
import { Food } from "../model/Food.js";
import path from 'path'
import { Drink } from "../model/Drink.js";
import { Relation } from "../model/RelationFoodDrinksPackage.js";
import { Package } from "../model/Package.js";
import { Bank } from "../model/Bank.js";
import { Order } from "../model/Order.js";

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
    
    return Food.create({
        dataImage: path.join(__dirname, "sample.jpeg"),
        typeImage: "image/jpeg",
        name: `Sample Food 1`,
        qty: 5,
        price: 10000,
        description: "This is a sample food item.",
    });
}

export const getOneFood = async () => {
    return Food.findOne()
}

export const deleteFood = async () => {
    return Food.deleteMany()
}


export const createDrink = async () => {
    const sampleImagePaths = [
        "sample1.jpg",
        "sample2.jpg",
        "sample3.jpg",
        "sample4.jpg",
        "sample5.jpg",
    ];
      
    for (const imagePath of sampleImagePaths) {;

        await Drink.create({
            dataImage: path.join(__dirname, "sample.jpeg"),
            typeImage: "image/jpeg",
            name: `Sample Drink ${sampleImagePaths.indexOf(imagePath) + 1}`,
            qty: 1,
            price: 1000,
            description: "This is a sample drink item.",
    });
}
}


export const createOneDrink = async () => {
    
    return Drink.create({
        dataImage: path.join(__dirname, "sample.jpeg"),
        typeImage: "image/jpeg",
        name: `Sample Drink 1`,
        qty: 5,
        price: 5000,
        description: "This is a sample drink item.",
    });
}

export const getOneDrink = async () => {
    return Drink.findOne()
}

export const deleteDrink = async () => {
    return Drink.deleteMany()
}

export const createPackage = async () => {
    const sampleImagePaths = [
        "sample1.jpg",
        "sample2.jpg",
        "sample3.jpg",
        "sample4.jpg",
        "sample5.jpg",
    ];
      
    for (const imagePath of sampleImagePaths) {;

        await Package.create({
            dataImage: path.join(__dirname, "sample.jpeg"),
            typeImage: "image/jpeg",
            name: `Paket hemat ${sampleImagePaths.indexOf(imagePath) + 1}`,
            price: 1000,
            description: "Ini Paket Hemat",
    });
}
}

export const createOnePackage = async () => {

    return Package.create({
        dataImage: path.join(__dirname, "sample.jpeg"),
        typeImage: "image/jpeg",
        name: `Paket hemat 1`,
        price: 1000,
        description: "Ini Paket Hemat",
});
}

export const getOnePackage = async () => {
    return Package.findOne()
}

export const deletePackage = async () => {
    return Package.deleteMany()
}

export const deleteRelation = async () => {
    return Relation.deleteMany()
}

export const createBank = async () => {
    const samplename = [
        "test1",
        "test2",
        "test3",
        "test4",
        "test5",
    ];
      
    for (const nameTest of samplename) {;

        await Bank.create({
            name: `${nameTest}`,
            noRek: 123456,
            nameBank: 1000,
    });
}
}

export const createOneBank = async () => {

    return Bank.create({
        name: `Test Bank`,
        noRek: 123456,
        nameBank: 1000,
});
}

export const getOneBank = async () => {
    return Bank.findOne()
}

export const deleteBank = async () => {
    return Bank.deleteMany();
}

export const deleteOrder = async () => {
    return Order.deleteMany();
}