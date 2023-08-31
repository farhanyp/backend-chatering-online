import supertest from "supertest";
import mongoose from "mongoose"
import { app } from "../../application/app";
import { connectMongoDB, closedMongoDB, deleteUser, createUser, getAdmin, getUser, createDrink, deleteDrink, deleteFood, getOneFood, getOneDrink, createOneFood, createOneDrink, deleteOrder} from "../util";
import { logger } from "../../application/logger";
import { log } from "winston";
import path from 'path'

describe('POST /api/v1/member/order/', () => {

    beforeAll(async () => {
        await connectMongoDB()
        await createOneFood()
        await createOneDrink()
    });

    afterAll(async () => {
        await deleteOrder()
        await deleteDrink()
        await deleteFood()
        // await closedMongoDB()
    });

    test("Should can create drink", async()=>{
        const getTestFood = await getOneFood()
        const getTestDrink = await getOneDrink()

        
        const result =  await supertest(app)
        .post('/api/v1/member/order')
        .attach("dataImage", path.join(__dirname, "sample.jpeg")) // Path to a sample image
        .field("name", "Test")
        .field("address", "Test")
        .field("qtyFood", 2)
        .field("qtyDrink", 2)
        .field("totalPrice", 30000)
        .field("foodId", getTestFood.id)
        .field("drinkId", getTestDrink.id)

        expect(result.status).toBe(200)
        expect(result.body.data.dataImage).toBeDefined()
        expect(result.body.data.typeImage).toBeDefined()
        expect(result.body.data.name).toBe("Test")
        expect(result.body.data.qtyFood).toBe(2)
        expect(result.body.data.qtyDrink).toBe(2)
        expect(result.body.data.totalPrice).toBe(30000)
        expect(result.body.data.address).toBe("Test")
        
    })
    
})

