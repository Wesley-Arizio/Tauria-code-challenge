import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    // Inserts seed entries
    await knex("user").insert([
        { id: 1, email: "marcos@gmail.com", name: "Marcos", password: "123456789" },
        { id: 2, email: "andre@gmail.com",  name: "Andre",  password: "123456789" },
        { id: 3, email: "joana@gmail.com",  name: "Joana",  password: "123456789" }
    ]);
};
