import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("room").del();

    // Inserts seed entries
    await knex("room").insert([
        { id: 1, name: "br_office", capacity: 150, participants: [2, 3], host: 1 },
        { id: 2, name: "main", capacity: 50, participants: [1, 3], host: 2 }
    ]);
};
