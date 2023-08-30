import supertest from "supertest";
import mongoose from "mongoose"
import { app } from "../../application/app";
import { connectMongoDB, closedMongoDB, deleteUser, createUser, getAdmin, getUser, createFood, deleteFood, getOneFood, createOneFood} from "../util";
import { logger } from "../../application/logger";
import { log } from "winston";
import path from 'path'

describe('POST /api/v1/admin/food/create', () => {

    beforeAll(async () => {
        await connectMongoDB()
        await createUser()
    });

    afterAll(async () => {
        await deleteFood()
        await deleteUser()
        // await closedMongoDB()
    });

    test("Should can create food", async()=>{
        const getTestAdmin = await getAdmin()
        
        const result =  await supertest(app)
        .post('/api/v1/admin/food/create')
        .set("Authorization", getTestAdmin.token)
        .attach("dataImage", path.join(__dirname, "sample.jpeg")) // Path to a sample image
        .field("name", "Sample Food")
        .field("qty", 1)
        .field("price", 1000)
        .field("description", "ini food")

        expect(result.status).toBe(200)
        expect(result.body.data.dataImage).toBeDefined()
        expect(result.body.data.typeImage).toBeDefined()
        expect(result.body.data.name).toBe("Sample Food")
        expect(result.body.data.qty).toBe(1)
        expect(result.body.data.price).toBe(1000)
        expect(result.body.data.description).toBe("ini food")
        
    })

    test("Should reject if user create food", async()=>{
        const getTestUser = await getUser()
        
        const result =  await supertest(app)
        .post('/api/v1/admin/food/create')
        .set("Authorization", getTestUser.token)
        .attach("dataImage", path.join(__dirname, "sample.jpeg")) // Path to a sample image
        .field("name", "Sample Food")
        .field("qty", 1)
        .field("price", 1000)
        .field("description", "ini food")

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
        
    })

    test("Should reject if not input picture", async()=>{
        const getTestAdmin = await getAdmin()
        
        const result =  await supertest(app)
        .post('/api/v1/admin/food/create')
        .set("Authorization", getTestAdmin.token) // Path to a sample image
        .field("name", "Sample Food")
        .field("qty", 1)
        .field("price", 1000)
        .field("description", "ini food")

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
        
    })

    test("Should reject if not input picture, name, qty", async()=>{
        const getTestAdmin = await getAdmin()
        
        const result =  await supertest(app)
        .post('/api/v1/admin/food/create')
        .set("Authorization", getTestAdmin.token)
        .attach("dataImage", "") // Path to a sample image
        .field("name", "")
        .field("description", "")

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
        
    })
    
})

describe('GET /api/v1/member/food', () => {

    beforeAll(async () => {
        await connectMongoDB()
        await createFood()
    });

    afterAll(async () => {
        await deleteFood()
        // await closedMongoDB()
    });

    test("Should can get food", async()=>{
        const result =  await supertest(app)
        .get('/api/v1/member/food')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(5)
        
    })
    
})

describe('PATCH /api/v1/admin/food/:foodId', ()=>{

    beforeAll(async ()=>{
        await createFood()
    })

    afterAll(async () => {
        await deleteFood()
        await closedMongoDB()
    });

    it("Should can update food", async()=>{
        const getTestAdmin = await getAdmin()
        const getTestFood = await getOneFood()
        const result =  await supertest(app)
        .patch('/api/v1/admin/food/'+getTestFood._id)
        .set("Authorization", getTestAdmin.token)
        .attach("dataImage", path.join(__dirname, "sample2.jpeg"))
        .field("name", "Sample Food (edit)")
        .field("qty", 5)
        .field("price", 2000)
        .field("description", "Ini Sample Food (edit)")


        expect(result.status).toBe(200)
        expect(result.body.data.name).not.toBe(getTestFood.name)
        expect(result.body.data.qty).not.toBe(getTestFood.qty)
        expect(result.body.data.price).not.toBe(getTestFood.price)
        expect(result.body.data.description).not.toBe(getTestFood.description)
        
    })

})


describe('DELETE /api/v1/admin/food/:foodId', ()=>{

    beforeAll(async ()=>{
        await createOneFood()
    })

    afterAll(async () => {
        await deleteFood()
        await closedMongoDB()
    });

    it("Should can update food", async()=>{
        const getTestAdmin = await getAdmin()
        const getTestFood = await getOneFood()
        const result =  await supertest(app)
        .delete('/api/v1/admin/food/'+getTestFood._id)
        .set("Authorization", getTestAdmin.token)

        expect(result.status).toBe(200)
        
    })

})
