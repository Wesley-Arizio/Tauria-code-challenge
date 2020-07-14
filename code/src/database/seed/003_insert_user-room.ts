import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_room").del();

    // Inserts seed entries
    await knex("user_room").insert([
        { id: 1, user: 2, room: 1 },
        { id: 2, user: 3, room: 2 },
        { id: 3, user: 1, room: 2 }
    ]);
};
