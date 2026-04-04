import mongoose from "mongoose";

const url = "mongodb+srv://pruthvibhoite07_db_user:rhDYCmzsoS7sR4Ws@cluster0.ub6tntu.mongodb.net/?appName=Cluster0";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url); // ✅ no options
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
    }
};

export default connectDB;
