import mongoose from "mongoose";


const connected=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB is conneted🔼🔼")
        
    } catch (err) {
        console.log("DB is not connected❌❌❌❌")
    }
}

export default connected;