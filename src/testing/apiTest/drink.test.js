import supertest from "supertest";
import mongoose from "mongoose"
import { app } from "../../application/app";
import { connectMongoDB, closedMongoDB, deleteUser, createUser, getAdmin, getUser, createDrink, deleteDrink, getOneDrink, createOneDrink} from "../util";
import { logger } from "../../application/logger";
import { log } from "winston";
import path from 'path'

describe('POST /api/v1/admin/drink/create', () => {

    beforeAll(async () => {
        await connectMongoDB()
        await createUser()
    });

    afterAll(async () => {
        await deleteDrink()
        await deleteUser()
        // await closedMongoDB()
    });

    test("Should can create drink", async()=>{
        const getTestAdmin = await getAdmin()
        
        const result =  await supertest(app)
        .post('/api/v1/admin/drink/create')
        .set("Authorization", getTestAdmin.token)
        .attach("dataImage", path.join(__dirname, "sample.jpeg")) // Path to a sample image
        .field("name", "Sample Drink")
        .field("qty", 1)
        .field("price", 1000)
        .field("description", "ini Drink")

        expect(result.status).toBe(200)
        expect(result.body.data.dataImage).toBeDefined()
        expect(result.body.data.typeImage).toBeDefined()
        expect(result.body.data.name).toBe("Sample Drink")
        expect(result.body.data.qty).toBe(1)
        expect(result.body.data.price).toBe(1000)
        expect(result.body.data.description).toBe("ini Drink")
        
    })

    test("Should reject if user create Drink", async()=>{
        const getTestUser = await getUser()
        
        const result =  await supertest(app)
        .post('/api/v1/admin/Drink/create')
        .set("Authorization", getTestUser.token)
        .attach("dataImage", path.join(__dirname, "sample.jpeg")) // Path to a sample image
        .field("name", "Sample Drink")
        .field("qty", 1)
        .field("price", 1000)
        .field("description", "ini Drink")

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })

    test("Should reject if not input picture", async()=>{
        const getTestAdmin = await getAdmin()
        
        const result =  await supertest(app)
        .post('/api/v1/admin/Drink/create')
        .set("Authorization", getTestAdmin.token) // Path to a sample image
        .field("name", "Sample Drink")
        .field("qty", 1)
        .field("price", 1000)
        .field("description", "ini Drink")

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
        
    })

    test("Should reject if not input picture, name, qty", async()=>{
        const getTestAdmin = await getAdmin()
        
        const result =  await supertest(app)
        .post('/api/v1/admin/drink/create')
        .set("Authorization", getTestAdmin.token)
        .attach("dataImage", "") // Path to a sample image
        .field("name", "")
        .field("description", "")

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
        
    })
    
})

describe('GET /api/v1/member/drink', () => {

    beforeAll(async () => {
        await connectMongoDB()
        await createDrink()
    });

    afterAll(async () => {
        await deleteDrink()
        // await closedMongoDB()
    });

    test("Should can get drink", async()=>{
        const result =  await supertest(app)
        .get('/api/v1/member/drink')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(5)
        
    })
    
})

describe('PATCH /api/v1/admin/drink/:drinkId', ()=>{

    beforeAll(async ()=>{
        await createDrink()
    })

    afterAll(async () => {
        await deleteDrink()
        await closedMongoDB()
    });

    it("Should can update drink", async()=>{
        const getTestAdmin = await getAdmin()
        const getTestDrink = await getOneDrink()
        const result =  await supertest(app)
        .patch('/api/v1/admin/drink/'+getTestDrink._id)
        .set("Authorization", getTestAdmin.token)
        .attach("dataImage", path.join(__dirname, "sample2.jpeg"))
        .field("name", "Sample Drink (edit)")
        .field("qty", 5)
        .field("price", 2000)
        .field("description", "Ini Sample Drink (edit)")


        expect(result.status).toBe(200)
        expect(result.body.data.name).not.toBe(getTestDrink.name)
        expect(result.body.data.qty).not.toBe(getTestDrink.qty)
        expect(result.body.data.price).not.toBe(getTestDrink.price)
        expect(result.body.data.description).not.toBe(getTestDrink.description)
        
    })

})


describe('DELETE /api/v1/admin/drink/:drinkId', ()=>{

    beforeAll(async ()=>{
        await createOneDrink()
    })

    afterAll(async () => {
        await deleteDrink()
        await closedMongoDB()
    });

    it("Should can update drink", async()=>{
        const getTestAdmin = await getAdmin()
        const getTestDrink = await getOneDrink()
        const result =  await supertest(app)
        .delete('/api/v1/admin/drink/'+getTestDrink._id)
        .set("Authorization", getTestAdmin.token)

        expect(result.status).toBe(200)
        
    })

})
