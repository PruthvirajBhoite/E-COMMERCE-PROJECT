import mongoose from "mongoose";

const url = "mongodb+srv://pruthvibhoite07_db_user:ZOSBlkTNnfmAcGSM@cluster0.1jmrbzu.mongodb.net/?appName=Cluster0"

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(url)
        console.log(`MongoDB Connected: ${conn.connection.host}`)

    }catch(error){
        console.log(`MongoDB Error: ${error}`)
    }
}

export default connectDB;
