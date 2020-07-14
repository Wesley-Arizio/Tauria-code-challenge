import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('room', table => {
        table.increments('id').primary().notNullable();
        table.string('name').notNullable();
        table.integer('capacity').notNullable();
        table.specificType('participants', 'INT[]'); 

        table.integer('host')
            .notNullable()
            .references('id')
            .inTable('user');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('room');
}

