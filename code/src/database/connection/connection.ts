import knex from 'knex';

const connection = knex({
        client: 'pg',
        connection: {
            host: 'localhost',
            user:   'postgres',
            password: 'toor',
            database: 'tauria'
        }
});

export default connection;