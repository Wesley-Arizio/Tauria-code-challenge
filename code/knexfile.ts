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

  }
};
