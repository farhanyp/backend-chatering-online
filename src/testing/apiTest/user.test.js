import supertest from "supertest";
import mongoose from "mongoose"
import { app } from "../../application/app";
import { connectMongoDB, closedMongoDB, deleteUser, createUser} from "../util";
import { logger } from "../../application/logger";
import { log } from "winston";

describe('POST /api/v1/member/login', () => {

    beforeAll(async () => {
        await connectMongoDB()
        await createUser()
    });

    afterAll(async () => {
        await deleteUser()
        // await closedMongoDB()
    });

    test('should can login as admin', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/login')
        .send({
            username : 'admin-catering-online',
            password : 'admin-catering-online-357159',
        })

        expect(result.status).toBe(200)
        expect(result.body.data.role).toBe("admin")
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data._id).toBeDefined()
    })

    test('should can login as user', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/login')
        .send({
            username : 'user1',
            password : 'user1',
        })

        expect(result.status).toBe(200)
        expect(result.body.data.role).toBe("user")
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data._id).toBeDefined()
    })

    test('should reject login if not input username and password', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/login')
        .send({
            username : '',
            password : 'admin-catering-online-357159',
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    test('should reject login if wrong username', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/login')
        .send({
            username : 'salah',
            password : 'admin-catering-online-357159',
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    test('should reject login if wrong password', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/login')
        .send({
            username : 'admin-catering-online',
            password : 'salah',
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
    
})

describe('POST /api/v1/member/register', () => {

    beforeAll(async () => {
        await connectMongoDB()
    });

    afterAll(async () => {
        await deleteUser()
        await closedMongoDB()
    });

    test('should can register', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/register')
        .send({
            username : 'user1',
            password : 'user1',
        })

        logger.info(result)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBeDefined()
        expect(result.body.data.password).toBeDefined()
        expect(result.body.data.role).toBeDefined()
        expect(result.body.data._id).toBeDefined()
    })

    test('should reject register if input username invalid', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/register')
        .send({
            username : '',
            password : 'user1',
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    test('should reject register if input password invalid', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/register')
        .send({
            username : 'user1',
            password : '',
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    test('should reject register if input username and password invalid', async () =>{
        const result = await supertest(app)
        .post('/api/v1/member/register')
        .send({
            username : '',
            password : '',
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    test('should reject login if duplicate username', async () =>{
        let result = await supertest(app)
        .post('/api/v1/member/register')
        .send({
            username : 'user1',
            password : 'user1',
        })

        result = await supertest(app)
        .post('/api/v1/member/register')
        .send({
            username : 'user1',
            password : 'user1',
        })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
    
})