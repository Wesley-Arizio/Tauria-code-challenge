import express from 'express';
import authenticate from '../../middleware/routeAuthenticate';
import userController from '../../controller/userController/userController';
import userValidate from '../../schemaValidation/user';

const privateRoute = express.Router();

declare global {
        namespace Express {
            export interface Request {
                userId: any
        }
    }
 }


privateRoute.use(authenticate)

privateRoute.get('/home', (req, res) => {
    return res.status(200).send();
})


// update user
privateRoute.put('/user', userController.updateUser);

//delete user
privateRoute.delete('/user', userController.deleteUser);


export default privateRoute;