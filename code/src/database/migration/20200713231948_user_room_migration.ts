import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user_room', table => {
        table.uuid('user_id')
            .notNullable()
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.uuid('room_id')
            .notNullable()
            .references('id')
            .inTable('room')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.primary(['user_id', 'room_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user_room');
}

