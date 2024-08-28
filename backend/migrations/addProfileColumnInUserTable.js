import mongoose from 'mongoose';
import User from '../models/userModel.js';
import databaseConnection from '../config/databaseConnection.js';
import dotenv from "dotenv";
dotenv.config();

// Connect to the database
const dbConnection = await mongoose.connect(process.env.CONNECTION_STRING);
// Function to update existing documents
const updateDocuments = async () => {
    try {
        const result = await User.updateMany({ }, [ {$set : { "profile": ""} } ]);
        console.log("Matched documents:", result.matchedCount);
        console.log("Modified documents:", result.modifiedCount);

        console.log("Documents updated successfully");
    } catch (error) {
        console.error("Error updating documents:", error);
    } finally {
        // Disconnect from the database
        dbConnection.disconnect(); // Disconnect the Mongoose connection
    }
};

// Run the update function
updateDocuments();
