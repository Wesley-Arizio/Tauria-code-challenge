import express from 'express';

import  userController from '../controller/userController/userController';


const routes = express.Router();

// create an user
routes.post('/user', userController.createUser);

// route to authenticate an user
routes.post('/authenticate', userController.authenticate);

// routes to get all users
routes.get('/users', userController.getUsers);

// route to get user by name
routes.get('/user', userController.getUserByName);

export default routes;