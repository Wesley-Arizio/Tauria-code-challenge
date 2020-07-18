import Joi from '@hapi/joi'

const userValidate = async (data: Object) => {
    const userValidator = Joi.object({
        
        username: Joi.string()
                .alphanum()
                .required(),

        mobile_token: Joi.string()
            .alphanum(),

        password: Joi.string()
            .min(8)
            .max(255)
            .required()
    });
    
    return  userValidator.validate(data);
}

export default userValidate;