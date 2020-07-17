import Joi from '@hapi/joi'

const roomValidator = Joi.object({
        
    name: Joi.string()
            .required(),

    capacity: Joi.number()
        .default(5)
        .min(1)
        .max(50)
        .optional(),

    participants: Joi.array()
        .items(Joi.number().required())
        .unique()
        .default([])
        .max(Joi.ref("capacity")),

    host: Joi.number()
        .required()
        
});

const roomValidate = async (data: Object) => {
    return  roomValidator.validate(data);
}

export default roomValidate;