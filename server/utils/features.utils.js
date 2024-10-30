import dotenv from "dotenv";
import mongoose from "mongoose"

dotenv.config();
export const connectDB = (uri) => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("database is connected");
    }).catch((error) => console.log(error)
    )
}
