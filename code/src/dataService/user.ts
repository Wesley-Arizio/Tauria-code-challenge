import { User } from '../controller/userController/userController';
import crypto from 'crypto-js'

class Hash{

    async userGenerateHash(user: User){
        try {
                
            const email     = crypto.SHA256(user.email).toString(crypto.enc.Hex);
            const name      = crypto.SHA256(user.name).toString(crypto.enc.Hex);
            const password  = crypto.SHA256(user.password).toString(crypto.enc.Hex);


            return await Promise.all([email, name, password])
                .then((data) => {
                    return {
                        email:    data[0],
                        name:     data[1],
                        password: data[2]
                    };
                })
                .catch((error) => {
                    return {
                        message: 'Error returning promise: ',
                        error
                    }
                });
        } catch(error) {
            return {
                message: 'Error encrypting data: ',
                error
            }
        }
    }
    
    async getEmailHash(email: string){
        try{
            return crypto.SHA256(email).toString(crypto.enc.Hex);
        }catch(error){
            return {
                message: 'Error ong getting user by email',
                error
            }
        }
    }

}

export default new Hash;