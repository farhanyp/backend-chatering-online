import supertest from "supertest";
import mongoose from "mongoose"
import { app } from "../../application/app";
import { connectMongoDB, closedMongoDB, deleteUser, createUser, getAdmin, createBank, deleteBank, createOneBank, getOneBank} from "../util";
import { logger } from "../../application/logger";
import { log } from "winston";

describe('POST /api/v1/admin/bank/create', () => {

    beforeAll(async () => {
        // await connectMongoDB()
    });

    afterAll(async () => {
        await deleteBank()
        // await closedMongoDB()
    });

    test('should can create bank', async () =>{
        const getTestAdmin = await getAdmin()

        const result = await supertest(app)
        .post('/api/v1/admin/bank/create')
        .set("Authorization", getTestAdmin.token)
        .send({
            name : 'BCA',
            noRek : '123456789',
            nameBank : 'test',
        })
        
        expect(result.status).toBe(200)
        expect(result.body.data.name).toBe("BCA")
        expect(result.body.data.noRek).toBe("123456789")
        expect(result.body.data.nameBank).toBe("test")
    })
    
})


describe('GET /api/v1/admin/bank', () => {

    beforeAll(async () => {
        // await connectMongoDB()
        await createBank()
    });

    afterAll(async () => {
        await deleteBank()
        // await closedMongoDB()
    });

    test('should can create bank', async () =>{
        const getTestAdmin = await getAdmin()

        const result = await supertest(app)
        .get('/api/v1/member/bank')
        
        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(5)
    })
    
})

describe('PATCH /api/v1/admin/bank/:bankId', () => {

    beforeAll(async () => {
        // await connectMongoDB()
        await createOneBank()
    });

    afterAll(async () => {
        await deleteBank()
        // await closedMongoDB()
    });

    test('should can change bank', async () =>{
        const getTestAdmin = await getAdmin()
        const getTestBank = await getOneBank()

        const result = await supertest(app)
        .patch('/api/v1/admin/bank/'+getTestBank.id)
        .set("Authorization", getTestAdmin.token)
        .send({
            name : 'Bank Edit',
            noRek : '151849',
            nameBank : 'Bank Edit',
        })

        logger.info(result)

        expect(result.status).toBe(200)
        expect(result.body.data.name).not.toBe(getTestBank.name)
        expect(result.body.data.noRek).not.toBe(getTestBank.noRek)
        expect(result.body.data.nameBank).not.toBe(getTestBank.noRek)
    })
    
})

describe('DELETE /api/v1/admin/bank/:bankId', () => {

    beforeAll(async () => {
        // await connectMongoDB()
        await createOneBank()
    });

    afterAll(async () => {
        // await deleteBank()
        // await closedMongoDB()
    });

    test('should can delete bank', async () =>{
        const getTestAdmin = await getAdmin()
        const getTestBank = await getOneBank()

        const result = await supertest(app)
        .delete('/api/v1/admin/bank/'+getTestBank.id)
        .set("Authorization", getTestAdmin.token)

        expect(result.status).toBe(200)
    })
    
})