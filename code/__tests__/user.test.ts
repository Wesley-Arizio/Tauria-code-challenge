import supertest from 'supertest'
import app from '../src/app/server';

import connection from '../src/database/connection/connection';
import { v4 as uuidv4 } from 'uuid';
import auth from '../src/controller/userController/auth'

const request = supertest(app);

describe('should test users end-point and db requests', () => {
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
            username: "jose",
            mobile_token: "111111",
            password: "12"
        }

        const response = await request
                .post('/user')
                .send(invalidUser);

        expect(response.status).toBe(412);
        expect(response.body.message).toEqual("Invalid data");
        expect(response.body.error).toBeTruthy();
        
        done()
    });

    it('should verify if user already exist', async done => {
        const userExist = {
            username: "marcosSilva",
            mobile_token: "111111",
            password: "12345678"
        }

        const response = await request
            .post('/user')
            .send(userExist);

        expect(response.status).toBe(412);
        expect(response.body.message).toEqual("User already exist");

        done();
    });

    it('Should get users list', async done => {
        const response = await request.get('/users');
        
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual('You can see all users');
        done();
    });

    it('should get user by name', async done => {
        const username = { username: "marcosSilva" } ;
        const response = await request.get('/user').send(username);
        
        expect(response.status).toBe(200);
        expect(response.body.user.length).toBe(1);

        done();
    });

    it('should return token when authenticated', async done =>{
        const response = await request
            .post('/authenticate')
            .send({
                username: "marcosSilva",
                password: "123456789" 
            });

        expect(response.body).toHaveProperty('token');
        done();
    });

    it('should be able to accesss private route when authenticated', async done => {
        const id = uuidv4();
        const token = await auth(id);
        const response = await request
            .get('/home')
            .set(
                'Authorization',
                `Bearer ${token}`
            );

        expect(response.status).toBe(200);

        done();
    });

    it('should not be able to accesss private route without valid token', async done => {
        const response = await request
            .get('/home')
            .set(
                'Authorization',
                `Bearer invalid token`
            );
            
        expect(response.status).toBe(401);

        done();
    });
    
    it('should update user account', async done => {
        const id = uuidv4();
        const token = await auth(id);
        const response = await request
            .put('/user')
            .set(
                'Authorization',
                `Bearer ${token}`
            )
            .send({
                username: "marcosSilva",
                mobile_token: "111111",
                password: "987654321" 
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual('user was updated');

        done();
    });

    it('should delete an account', async done => {
        const id = uuidv4()
        const token = await auth(id);
        const response = await request
            .delete('/user')
            .set(
                'Authorization',
                `Bearer ${token}`
            )
        
        expect(response.status).toBe(204);
        // expect(response.body.message).toEqual('User was deleted');
    
        done();
    })
});
