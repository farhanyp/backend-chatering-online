import supertest from "supertest";
import mongoose from "mongoose"
import { app } from "../../application/app";
import { connectMongoDB, closedMongoDB, deleteUser, createUser, getAdmin, getUser, createDrink, createOneFood, deleteDrink, deleteFood, getOneDrink, getOneFood, createOneDrink, deletePackage, deleteRelation, createPackage, createOnePackage, getOnePackage} from "../util";
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
        // await deleteDrink()
        // await deleteFood()
        // await deletePackage()
        // await deleteRelation()
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
        expect(result.body.data.relations).toBeDefined()
        expect(result.body.data.name).toBe("Paket hemat")
        expect(result.body.data.price).toBe(1000)
        expect(result.body.data.description).toBe("Ini Paket Hemat")
    })
    
})

describe('GET /api/v1/member/package', () => {

    beforeAll(async () => {
        await connectMongoDB()
        // await createPackage()
        
    });

    afterAll(async () => {
        // await deletePackage()
        // await closedMongoDB()
    });

    test("Should can get package", async()=>{
        const result =  await supertest(app)
        .get('/api/v1/member/package')

        expect(result.status).toBe(200)
    })
    
})


describe('PATCH /api/v1/admin/package/:packageId', () => {

    beforeAll(async () => {
        await connectMongoDB()
        // await createOneFood()
        // await createOneDrink()
        // await createOnePackage()
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
        const getTestPackage = await getOnePackage()

        const getTestAnotherFood = await createOneFood()
        const getTestAnotherDrink = await createOneDrink()
        
        
        const result =  await supertest(app)
        .patch('/api/v1/admin/package/'+getTestPackage._id)
        .set("Authorization", getTestAdmin.token)
        .attach("dataImage", path.join(__dirname, "sample.jpeg")) // Path to a sample image
        .field("name", "Paket hemat (edit)")
        .field("price", 1000)
        .field("description", "Ini Paket Hemat (edit)")
        .field("foodId", getTestAnotherFood.id)
        .field("drinkId", getTestAnotherDrink.id)

        expect(result.status).toBe(200)
        expect(result.body.data.name).toBe("Paket hemat (edit)")
        expect(result.body.data.price).toBe(1000)
        expect(result.body.data.description).toBe("Ini Paket Hemat (edit)")
        expect(result.body.data.relations).toBeDefined()
    })
    
})


describe('DELETE /api/v1/admin/package/:packageId', () => {

    beforeAll(async () => {
        await connectMongoDB()
        // await createOneFood()
        // await createOneDrink()
        // await createOnePackage()
    });

    afterAll(async () => {
        // await deleteDrink()
        // await deleteFood()
        // await deletePackage()
        // await deleteRelation()
        // await closedMongoDB()
    });

    test("Should can create package", async()=>{
        const getTestAdmin = await getAdmin()
        const getTestPackage = await getOnePackage()
        
        
        const result =  await supertest(app)
        .delete('/api/v1/admin/package/'+getTestPackage._id)
        .set("Authorization", getTestAdmin.token)

        expect(result.status).toBe(200)
        expect(result.data).toBe("Data sudah dihapus")
    })
    
})
