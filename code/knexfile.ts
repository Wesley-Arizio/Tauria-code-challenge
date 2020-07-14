// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',

    connection: {
      database: 'tauria',
      user: 'postgres',
      password: 'toor',
    },

    searchPath: ['knex', 'private'],

    migrations: {
      schemaName: 'private',
      directory: `${__dirname}/src/database/migration`,
    },

    seeds: {
      directory: `${__dirname}/src/database/seed`,
    }

  },

  test: {
    client: 'sqlite3',

    connection: {
      filename: `${__dirname}/db_test/db_test.sqlite`
    },

    useNullAsDefault: true,

    migrations: {
      directory: `${__dirname}/db_test/migration`,
    },

    seeds: {
      directory: `${__dirname}/db_test/seed`,
    }
  }
};
