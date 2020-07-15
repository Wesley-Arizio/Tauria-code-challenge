import knex from '../../database/connection/connection';
import { Request, Response } from 'express';

import userValidate from '../../schemaValidation/user';


interface User {
    email: string,
    name: string,
    password: string
}

class UserController {

    async validateData(req: Request, res: Response){

        const { value, error } =  await userValidate(req.body);
        const user: User = value;


        if(error) {
            return res.status(412).send({
                message: "Invalid data",
                error: error.details[0].message,
            });
        }

        const userCount: any =  await knex('user').where('email', user.email);

        if(userCount.length > 0){
            return res.status(412).send({
                message: "User already exist"
            });
        }

        try{
            const userRegistered = await knex
                .insert({ email: user.email ,name: user.name, password: user.password })
                .table('user');


            return res.status(200).send(userRegistered);
        }catch(error){
            return res.status(400).send({
                message: "Error on registering an user, please try again",
                error
            });
        }
    }   
}

export default new UserController;