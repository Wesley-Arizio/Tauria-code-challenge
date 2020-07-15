import connection from '../db_test/connection';
import supertest from 'supertest'
import app from '../src/app/server';

import hash  from  '../src/dataService/user';
import userValidate from '../src/schemaValidation/user';
import { User } from '../src/controller/userController/userController';

const request = supertest(app);

describe('should test user iteration', () => {
    
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

        const response = await request
                .post('/user')
                .send(invalidUser);

        expect(response.status).toBe(412);
        expect(response.body.message).toEqual("Invalid data");
        expect(response.body.error).toBeTruthy();
        
        done()
    });

    it('should verify if user already exists', async done => {
        const invalidUser = {
            email: 'wesley@gmail.com',
            name: 'wesleyGolembiewski',
            password: '734i84urf7e'
        }

        const response = await request
                .post('/user')
                .send(invalidUser);

        expect(response.status).toBe(412);
        expect(response.body.message).toEqual("User already exist");
        
        done()
    });

    it('should insert a new user with hash', async done => {
        const user = {
            name: "MarioJose",
            email: "mariojose@gmail.com",
            password: '123456789'
        }

        const hashUser = await hash.userGenerateHash(user) as User;

        const insertedUser = await connection('user').insert(hashUser);

        expect(insertedUser).toBeTruthy();
        done();
    });

    it('should get email hash and return an user', async done => {
        const emailHash = await hash.getEmailHash('wesley@gmail.com');

        const user = await connection('user').select('*').where('email', emailHash);

        expect(user.length).toBe(1);
        done();
    });
});