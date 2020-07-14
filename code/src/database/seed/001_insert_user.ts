import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    // Inserts seed entries
    await knex("user").insert([
        { id: 1, name: "Marcos", password: "1234567" },
        { id: 2, name: "André",  password: "1234567" },
        { id: 3, name: "Joana",  password: "1234567" }
    ]);
};
