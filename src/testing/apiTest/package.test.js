import supertest from "supertest";
import mongoose from "mongoose"
import { app } from "../../application/app";
import { connectMongoDB, closedMongoDB, deleteUser, createUser, getAdmin, getUser, createDrink, createOneFood, deleteDrink, deleteFood, getOneDrink, getOneFood, createOneDrink, deletePackage, deleteRelation} from "../util";
import { logger } from "../../application/logger";
import { log } from "winston";
import path from 'path'

describe('POST /api/v1/admin/package/create', () => {

    beforeAll(async () => {
        await connectMongoDB()
        await createOneFood()
        await createOneDrink()
    });

    afterAll(async () => {
        await deleteDrink()
        await deleteFood()
        await deletePackage()
        await deleteRelation()
        // await closedMongoDB()
    });

    test("Should can create package", async()=>{
        const getTestAdmin = await getAdmin()
        const getTestFood = await getOneFood()
        const getTestDrink = await getOneDrink()
        
        const result =  await supertest(app)
        .post('/api/v1/admin/package/create')
        .set("Authorization", getTestAdmin.token)
        .attach("dataImage", path.join(__dirname, "sample.jpeg")) // Path to a sample image
        .field("name", "Paket hemat")
        .field("price", 1000)
        .field("description", "Ini Paket Hemat")
        .field("foodId", getTestFood.id)
        .field("drinkId", getTestDrink.id)

        expect(result.status).toBe(200)
        expect(result.body.data.package).toBeDefined()
        expect(result.body.data.drink).toBeDefined()
        expect(result.body.data.food).toBeDefined()
    })
    
})
