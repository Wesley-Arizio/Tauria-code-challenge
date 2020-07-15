import connection from '../db_test/connection';
import supertest from 'supertest'
import app from '../src/app/server';

const request = supertest(app);

describe('auth', () => {
    
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
    
    it('should sum 2 numbers', async done => {
        const sum = (a: number, b: number) => {
            return a + b;
        }
        const expectedREsult =  sum(1, 1);
        
        expect(expectedREsult).toBe(2);
        done()
    });
});