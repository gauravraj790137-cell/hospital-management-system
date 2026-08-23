import mongoose from "mongoose";


const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`\nMongoDB connected: ${connectionInstance.connection.host}\n`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;