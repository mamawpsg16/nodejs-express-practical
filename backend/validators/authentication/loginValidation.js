import { check } from 'express-validator';

export default [

    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please include a valid email'),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters'),
];
