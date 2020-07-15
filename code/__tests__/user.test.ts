import connection from '../db_test/connection';
import supertest from 'supertest'
import app from '../src/app/server';
import crypto from 'crypto-js';

const request = supertest(app);

describe('should test user registration', () => {
    
    beforeAll( async () => {
        // run migration
        await connection.migrate.latest();
    });

    beforeEach( async () => {
        // run seed
        await connection.seed.run();
    });

    afterEach( async () => {
        // delete data
        await connection.table('user').delete();
    });

    afterAll( async () => {
        // Delete table
        await connection.table('user').del();
    });
    
    it('should return error when receives invalid data', async done => {
        const invalidUser = {
            email: "user.name@gmail.com",
            name: "jose",
            password: "12345678"
        }

        //user
        const response = await request
                .post('/user')
                .send(invalidUser);

        expect(response.status).toBe(412);
        expect(response.body.message).toEqual("Invalid data");
        expect(response.body.error).toBeTruthy();
        
        done()
    });

    it('should insert a new user with hash', async done => {
        const user = {
            name: "MarioJose",
            email: "mariojose@gmail.com",
            password: '123456789'
        }

        crypto.SHA256(user.password).toString(crypto.enc.Hex);
        

        const insertedUser = await connection('user').insert(user);

        expect(insertedUser).toBeTruthy();

        done();
    });

    it('should verify if user already exist', async done => {
        const userNotFound = {
            email: "marcos@gmail.com",
            name: "marcosSilva",
            password: "12345678"
        }

        const response = await request
            .post('/user')
            .send(userNotFound);

        console.log(response.body);
        expect(response.status).toBe(412);
        expect(response.body.message).toEqual("User already exist");

        done();
    });
});