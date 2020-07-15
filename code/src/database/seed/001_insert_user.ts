import * as Knex from "knex";
import encrypt from '../../dataService/user';

import { User } from '../../controller/userController/userController';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    const user = await encrypt.userGenerateHash({
        email: 'wesley@gmail.com',
        name: 'wesleyGolembiewski',
        password: '734i84urf7e'
    }) as User;

    // Inserts seed entries
    await knex("user").insert([
        { id: 1, email: "marcos@gmail.com", name: "Marcos", password: "123456789" },
        { id: 2, email: "andre@gmail.com",  name: "Andre",  password: "123456789" },
        { id: 3, email: "joana@gmail.com",  name: "Joana",  password: "123456789" },
        { id: 4, email: user.email, name: user.name, password: user.password      }
    ]);
};
