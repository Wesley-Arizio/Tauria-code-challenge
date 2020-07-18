import jwt from 'jsonwebtoken'

import authConfig from '../controller/userController/authConfig'
import { Request, Response, NextFunction, RequestHandler, request } from 'express'



export default function authenticate(req: Request, res: Response, next: NextFunction){

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({
            error: "No token provided"
        });
    }

    const token = authHeader.split(' ');

    if(token.length !== 2){
        return res.status(401).send({
            error: 'Token has errors'
        });
    }

    const [ bearer, code ] = token

    if(!/^Bearer$/i.test(bearer)){
        return res.status(400).send({
            error: 'Token malformated'
        });
    }

    jwt.verify(code, authConfig.secret, (error,  decoded: any) => {
        if(error){
            return res.status(401).send({
                error: 'Invalid token'
            });
        }
        
        req.userId = decoded.id
        next();
    });


}
