import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers['authorization']; // Case-insensitive access to 'authorization'
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'User is not authorized or token is missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded.user;
        next(); // Proceed to the next middleware or route handler
    });
});

export default validateToken;
