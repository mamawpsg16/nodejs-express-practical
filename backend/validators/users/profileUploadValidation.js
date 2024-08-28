import { check } from 'express-validator';

const profileUploadValidation = [
    check('profile')
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Profile picture is required');
            }
            // Optionally, you can add more checks for file type and size here
            return true;
        })
];

export default profileUploadValidation;