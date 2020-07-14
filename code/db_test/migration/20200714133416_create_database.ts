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
    })

    .createTable('room', table => {
        table.increments('id')
            .primary()
            .notNullable();

        table.string('name')
            .notNullable();

        table.integer('capacity')
            .notNullable();

        table.specificType('participants', 'INT[]');

        table.integer('host')
            .notNullable()
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })

    .createTable('user_room', table => {
        table.increments('id').primary().notNullable();

        table.integer('user')
            .notNullable()
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.integer('room')
            .notNullable()
            .references('id')
            .inTable('room')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('user')
        .dropTable('room')
        .dropTable('user_room')
}

