import { User } from '../controller/userController/userController';
import crypto from 'crypto-js'

class Encript{

    async encryptedData(user: User){
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
                        message: 'error on return promise: ',
                        error
                    }
                });
        } catch(error) {
            console.error('Error on encrypting data: ', error);
        }
    }
}

export default new Encript;