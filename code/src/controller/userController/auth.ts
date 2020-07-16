import jwt from 'jsonwebtoken';
import authConfig from './authConfig';

export default async function generateToken(id: number){
    return jwt.sign({id: id}, authConfig.secret, {
        expiresIn: 86400
    });
}