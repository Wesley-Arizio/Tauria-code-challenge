import knex from '../../database/connection/connection';
import { Request, Response } from 'express';
import crypto from 'crypto-js'
import { v4 as uuidv4 } from 'uuid';

import auth from './auth';
import userValidate from '../../schemaValidation/user';
import Joi from '@hapi/joi';

export interface User {
    username: string,
    mobile_token?: string,
    password: string
}

class UserController {

    async createUser(req: Request, res: Response){

        const { value, error } =  await userValidate(req.body);
        const user: User = value;

        if(error) {
            return res.status(412).send({
                message: "Invalid data",
                error: error.details[0].message,
            });
        }

        const userCount: any =  await knex('user').where('username', user.username);

        
        if(userCount.length > 0){
            return res.status(412).send({
                message: "User already exist"
            });
        }

        
        try{
            const hashPassword = crypto.SHA256(user.password).toString(crypto.enc.Hex); 
            const insertedUser = await knex('user')
                .insert({
                    id: uuidv4(),
                    username: user.username,
                    mobile_token: user.mobile_token,
                    password: hashPassword
                }, 'id');

           const token = await auth(insertedUser[0]);
        console.log(insertedUser)
           return res.status(200).send({
               messsage: 'User has been created',
               token
           });
        }catch(error){
            return res.status(400).send({
                message: "Error validating user",
                error
            });
        }
    }
    
    async getUsers(req: Request, res: Response){
        try {
            await knex('user')
                .select('id', 'username', 'mobile_token')
                    .then(users => {
                        return res.status(200).send({
                            message: 'You can see all users',
                            users
                        });
                    })
                    .catch(error => {
                        return res.status(400).send({
                            message: 'Cannot get any user: ',
                            error
                        });
                    });
        } catch(error) {
            return res.status(400).send({
                message: "Error on getting all users: ",
                error
            });
        }
    }

    async getUserByName(req: Request, res: Response){

        const nameValidate = Joi.object({
            username: Joi.string()
                .alphanum()
                .required()
        });

        const { value, error } = nameValidate.validate(req.body);

        if(error) {
            return res.status(412).send({
                message: "Invalid data",
                error: error.details[0].message,
            });
        }

        const usersFound = await knex('user').select('id', 'username', 'mobile_token').where('username', value.username);

        if(usersFound.length === 0){
            return res.status(412).send({
                message: "User not found"
            });
        }

        return res.status(200).send({
            user: usersFound
        });
    }

    async authenticate(req: Request, res: Response){        
        const validAuth = Joi.object({
            username: Joi.string()
                .required(),

            password: Joi.string()
                .min(8)
                .max(255)
                .required()
        });

        const { value, error } = validAuth.validate(req.body);
        const user: User = value;
        

        if(error) {
            return res.status(412).send({
                message: "Invalid data",
                error: error.details[0].message,
            });
        }

        const userCount: any =  await knex('user').where('username', user.username);

        if(userCount.length === 0){
            return res.status(412).send({
                message: "Invalid credentials"
            });
        }

        try {
            const hashPassword = crypto.SHA256(user.password).toString(crypto.enc.Hex);

            if(hashPassword !== userCount[0].password){
                return res.status(400).send({
                    message: "Invalid credentials"
                })
            }
            const token = await auth(userCount[0].id);

            return res.status(200).send({
                message: 'user is authenticated',
                token
            });
        } catch(error) {
            return res.status(400).send({
                message: 'Error authenticating user'
            });

        }
    }

    async updateUser(req: Request, res: Response){
        const  id = req.userId;
        
        const { value, error } = await userValidate(req.body);
        const user: User = value;

        if(error){
            return res.status(400).send({
                message: 'Invalid data, cannot update your information: ',
                error
            });
        }

        
        try {
            const hashPassword =  crypto.SHA256(user.password).toString(crypto.enc.Hex);
            const userUpdated = await knex('user')
                .update({
                    username: user.username,
                    mobile_token: user.mobile_token,
                    password: hashPassword
                }, ['username', 'mobile_token', 'password'])
                .where('id', id);
 
            return res.status(200).send({
                message: 'user was updated',
                userUpdated
            })
        } catch (error) {
            return res.status(400).send({
                message: 'Error updating user information',
                error
            });
        }
    }

    async deleteUser(req: Request, res: Response){
        const id = req.userId;

        try {
            await knex('user').delete().where('id', id);

            req.userId = undefined;
            
            return res.status(204).send()
        } catch (error) {
            return res.status(400).send({
                message: 'Error on deleting an user'
            })
        }
    }
}

export default new UserController;