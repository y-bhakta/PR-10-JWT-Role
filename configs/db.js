import mongoose from "mongoose"
import dotenv from "./dotenv.js"

const db=async()=>{
    try {
        await mongoose.connect(dotenv.MONGO_URL);
        console.log("Database Connected");        
    } catch (error) {
        console.log(error);        
    }
}

export default db();