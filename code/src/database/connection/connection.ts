import knexfile from '../../../knexfile';
import knex from 'knex';

const connection = knex(knexfile.development);

export default connection;