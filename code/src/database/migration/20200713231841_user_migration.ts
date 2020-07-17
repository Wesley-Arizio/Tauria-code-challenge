import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user', table => {
        table.uuid('id')
            .primary()
            .notNullable();

        table.string('username')
            .notNullable()
            .unique();

        table.string('mobile_token')
            .nullable();

        table.string('password')
            .notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user');
}

