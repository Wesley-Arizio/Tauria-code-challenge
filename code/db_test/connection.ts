import knex from 'knex'

const connection = knex({

    client: 'sqlite3',
        connection: {
        filename: `${__dirname}/db_test.sqlite`
    },

    useNullAsDefault: true,

    migrations: {
        directory: `${__dirname}/migration`
    },
    seeds: {
        directory: `${__dirname}/seed`
    }
});

export default connection;