import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const databaseConnection = async () =>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database Connected: ${connect.connection.host}, ${connect.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default databaseConnection;