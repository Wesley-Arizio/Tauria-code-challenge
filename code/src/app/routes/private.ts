import express from 'express';
import authenticate from '../../middleware/routeAuthenticate';
import userController from '../../controller/userController/userController';

const privateRoute = express.Router();

declare global {
        namespace Express {
            export interface Request {
                userId: number
        }
    }
 }


privateRoute.use(authenticate)

privateRoute.get('/home', (req, res) => {
    return res.status(200).send();
})

privateRoute.put('/user', userController.updateUser);

export default privateRoute;