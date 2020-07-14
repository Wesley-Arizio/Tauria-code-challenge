import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user', table => {
        table.increments('id')
            .primary()
            .notNullable();

        table.string('name')
            .notNullable();

        table.string('password')
            .notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user');
}

