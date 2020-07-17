import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('room', table => {
        table.uuid('id')
            .primary()
            .notNullable();

        table.string('name')
            .notNullable();

        table.integer('capacity')
            .notNullable();

        table.uuid('host_id')
            .notNullable()
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('room');
}

