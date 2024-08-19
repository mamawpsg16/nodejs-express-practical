import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const validateToken = asyncHandler(async(req, res, next) =>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader.startsWith('Bearer')){
        token = authHeader?.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            res.status(401);
            if(err) throw new Error('User is not authorized');
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error('User is not authorized or token is missing');
        }
    }
})

export default validateToken;