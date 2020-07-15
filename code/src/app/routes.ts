import express from 'express';

import  userController from '../controller/userController/userController';


const routes = express.Router();
routes.post('/user', userController.validateData);

export default routes;