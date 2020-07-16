import express from 'express';

import  userController from '../../controller/userController/userController';


const privateRoute = express.Router();

privateRoute.get('/routet/private', (req, res) => {
    res.send("ok");
})

export default privateRoute;