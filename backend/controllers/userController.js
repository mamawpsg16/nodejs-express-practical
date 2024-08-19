import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc Register user
// @route GET /api/users/register
// @access public
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        console.log('Missing fields');
        res.status(400);
        throw new Error("All fields required");
    }
    
    console.log('wtf'); // Should print if no fields are missing
    
    const userExists = await User.findOne({ email });
    
    console.log(userExists,"userExists");
    if (userExists) {
        console.log('User already exists');
        res.status(400);
        throw new Error("Email already exists");
    }
    
    console.log('HEYHEYHEY');
    // Create Hash Password Using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = await User.create({
        username,
        password:hashedPassword,
        email
    })
    
    if(!user){
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.status(201).json({_id: user.id, email: user.email})
   

   
});

// @desc Authenticate/Login user
// @route POST /api/users/login
// @access public
const login = asyncHandler(async (req, res) =>{
    const  { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required")
    }

    const user  = await User.findOne({ email: email});

    if(!user || !(await bcrypt.compare(password, user.password))){
        res.status(401);
        throw new Error("Email or password is invalid.")
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