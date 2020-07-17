import Joi from '@hapi/joi'

const roomValidator = Joi.object({
        
    name: Joi.string()
            .required(),

    capacity: Joi.number()
        .default(5)
        .min(1)
        .max(50)
        .optional(),

    host: Joi.any()
        .required()
        
});

const roomValidate = async (data: Object) => {
    return  roomValidator.validate(data);
}

export default roomValidate;