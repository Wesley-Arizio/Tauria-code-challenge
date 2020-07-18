import * as Knex from "knex";
import crypto from 'crypto-js'
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();
    await knex("room").del();
    await knex("user_room").del();
 
    const password = crypto.SHA256('123456789').toString(crypto.enc.Hex);
    // Inserts seed entries
    await knex("user").insert([
        { id: uuidv4(), username: "marcosSilva", mobile_token: "111111",  password:  password },
        { id: uuidv4(), username: "andreOliveira",  mobile_token: "222222",  password:  password },
        { id: uuidv4(), username: "mateusFernandes",  mobile_token: "333333",  password:  password }
    ]);
};