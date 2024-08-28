import { check } from 'express-validator';

export default [
    // Validation and sanitization middleware
    check('name')
        .notEmpty().withMessage('name is required')
        .isLength({ min: 5, max: 15 }).withMessage('name must be between 5 and 15 characters'),

    check('email')
        .isEmail().withMessage('Please include a valid email'),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters'),

    check('password_confirmation')
        .notEmpty().withMessage('Confirm Password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];
