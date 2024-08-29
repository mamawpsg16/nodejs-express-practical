import Joi from 'joi';

export default Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please include a valid email',
        'string.base': 'Email is required',
        }),

    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'string.max': 'Password must be less than or equal to 20 characters',
        }),
});




