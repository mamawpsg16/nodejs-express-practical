import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { formatValidationErrors, joiFormatValidationErrors } from '../helpers/errorFormatter.js';
import multer from 'multer';
import joiLoginValidation from '../validators/authentication/joiLoginValidation.js';
const upload = multer({ dest: 'uploads/' })
// Helper function to validate email



// @desc Register user
// @route GET /api/users/register
// @access public
const register = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = formatValidationErrors(errors.array());
        return res.status(422).json({ errors: formattedErrors });
    }

    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ errors: { email: ['Email already exists'] }});
    }

    // Hash Password Using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    if (!user) {
      res.status(400);
      throw new Error('User data is not valid');
    }

    res.status(201).json({ _id: user.id, email: user.email });
});

// @desc Authenticate/Login user
// @route POST /api/users/login
// @access public
const login = asyncHandler(async (req, res) =>{
    const { error } = joiLoginValidation.validate(req.body);
    console.log(error,"error");
    if (error) {
        const formattedErrors = joiFormatValidationErrors(error.details);
        return res.status(422).json({ errors: formattedErrors });
    }
    
    const  { email, password } = req.body;

    const user  = await User.findOne({ email: email});

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({ errors: { password: ["Email or password is invalid"]} });
    }

    const accessToken = await jwt.sign({
        user:{
            username: user.username,
            email: user.email,
            id: user.id
        }
    }, process.env.SECRET_KEY, { expiresIn:"15m"});
    res.status(200).json({accessToken});
});

// @desc Authenticate/Login user
// @route POST /api/users/login
// @access public
const uploadProfile = asyncHandler(async (req, res) => {
    // Check for validation errors (if any validation middleware is used)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({ errors: { file: "No file uploaded" } });
    }

    // Get the logged-in user (assuming you have user ID from authentication middleware)
    const userId = req.user.id; // Adjust according to your authentication setup
    console.log(userId, "userId");
    // Update the user's profile with the uploaded file path
    const user = await User.findByIdAndUpdate(userId, {
        profile: req.file.path
    }, { new: true });

    if (!user) {
        return res.status(404).json({ errors: { msg: "User not found" }});
    }

    res.status(200).json({ message: 'Profile picture updated successfully', profilePicture: req.file.path });
});


// @desc Get User Details
// @route GET /api/users/:id
// @access private
const user = asyncHandler(async(req, res) =>{
    res.json(req.user);
})




export { 
    register, 
    login,
    user,
    uploadProfile
}