import express from 'express';

import  userController from '../../controller/userController/userController';


const publicRoute = express.Router();

// create an user
publicRoute.post('/user', userController.createUser);

// route to authenticate an user
publicRoute.post('/authenticate', userController.authenticate);

// publicRoute to get all users
publicRoute.get('/users', userController.getUsers);

// route to get user by name
publicRoute.get('/user', userController.getUserByName);

export default publicRoute;