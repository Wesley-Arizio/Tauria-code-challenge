import * as Knex from "knex";
import crypto from 'crypto-js'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();
    await knex("room").del();
    await knex("user_room").del();
 
    const password = crypto.SHA256('123456789').toString(crypto.enc.Hex);

    // Inserts seed entries
    await knex("user").insert([
        { id:1, email: "marcos@gmail.com", name: "marcos", password:  password },
        { id:2, email: "andre@gmail.com",  name: "andre",  password:  password },
        { id:3, email: "joana@gmail.com",  name: "joana",  password:  password }
    ]);

    await knex("room").insert([
        { id:1, name: "br_office", capacity: 30, participants: [2, 3], host: 1 },
        { id:2, name: "main", capacity: 50, participants: [1, 3], host: 2 }
    ]);

    await knex("user_room").insert([
        { id:1, user: 2, room: 1 },
        { id:2, user: 3, room: 2 },
        { id:3, user: 1, room: 2 }
    ]);
};