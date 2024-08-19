import express from 'express';
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import databaseConnection from './config/databaseConnection.js';

databaseConnection();
const app = express();

const port = process.env.PORT || 5000;   

app.use((req, res, next) => {
    // Check if the Content-Type header is missing or incorrect
    if (!req.headers['content-type'] || req.headers['content-type'] !== 'application/json') {
        req.headers['content-type'] = 'application/json';
    }
    next();
});

// PARSE DATA FROM THE CLIENT TO THE SERVER
app.use(express.json());

// ROUTES
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

//ERROR HANDLER
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
});