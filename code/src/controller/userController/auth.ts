import jwt from 'jsonwebtoken';
import authConfig from './authConfig';

export default async function generateToken(id: any){
    return jwt.sign({id: id}, authConfig.secret, {
        expiresIn: 86400
    });
}