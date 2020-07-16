import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();
    await knex("room").del();
    await knex("user_room").del();


    // Inserts seed entries
    await knex("user").insert([
        { email: "marcos@gmail.com", name: "marcos", password: "123456789" },
        { email: "andre@gmail.com",  name: "andre",  password: "123456789" },
        { email: "joana@gmail.com",  name: "joana",  password: "123456789" }
    ]);

    await knex("room").insert([
        { name: "br_office", capacity: 30, participants: [2, 3], host: 1 },
        { name: "main", capacity: 50, participants: [1, 3], host: 2 }
    ]);

    await knex("user_room").insert([
        { user: 2, room: 1 },
        { user: 3, room: 2 },
        { user: 1, room: 2 }
    ]);
};
