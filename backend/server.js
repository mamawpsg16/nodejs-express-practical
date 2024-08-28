import express from 'express';
import cors from 'cors';
import routes from './routes/api.js';
import errorHandler from './middleware/errorHandler.js';
import databaseConnection from './config/databaseConnection.js';
import { dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);
const __basename = basename(__filename);

console.log('__dirname:', __dirname); // Directory path
console.log('__filename:', __filename); // Full path including file name
console.log('__basename:', __basename); // Just the file name
console.log(fileURLToPath(import.meta.url),'URL');

databaseConnection();
const app = express();

const port = process.env.PORT || 5000;   

app.use(express.static("public"));
app.use(cors({
    origin: 'http://localhost:5174'
}))

app.use((req, res, next) => {
    // Check if the Content-Type header is missing or incorrect
    if (!req.headers['content-type']) {
        req.headers['content-type'] = 'application/json';
    }
    next();
});

// PARSE DATA FROM THE CLIENT TO THE SERVER
app.use(express.json());

// ROUTES
app.use("/api", routes);

//ERROR HANDLER
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
});