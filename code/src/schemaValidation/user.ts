import Joi from '@hapi/joi'

const userValidate = async (data: Object) => {
    const userValidator = Joi.object({
        
        email: Joi.string()
                .email()
                .required(),

        name: Joi.string()
            .alphanum()
            .min(5)
            .max(20)
            .required(),

        password: Joi.string()
            .min(8)
            .max(255)
            .required()
    });
    return  userValidator.validate(data);
}

export default userValidate;