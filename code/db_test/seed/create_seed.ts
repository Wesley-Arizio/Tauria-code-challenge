import * as Knex from "knex";
import  hash from '../../src/dataService/user';
import { User } from '../../src/controller/userController/userController';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();
    await knex("room").del();
    await knex("user_room").del();

    const user = await hash.userGenerateHash({
        email: 'wesley@gmail.com',
        name: 'wesleyGolembiewski',
        password: '734i84urf7e'
    }) as User;

    // Inserts seed entries
    await knex("user").insert([
        { email: "marcos@gmail.com", name: "Marcos", password: "123456789" },
        { email: "andre@gmail.com",  name: "Andre",  password: "123456789" },
        { email: "joana@gmail.com",  name: "Joana",  password: "123456789" },
        { email: user.email,  name: user.name,  password: user.password }
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
