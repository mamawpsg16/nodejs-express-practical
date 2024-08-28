import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { formatValidationErrors } from '../helpers/errorFormatter.js';
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
    const errors = validationResult(req);
    console.log(errors,"errors");
    if (!errors.isEmpty()) {
        const formattedErrors = formatValidationErrors(errors.array());
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
}