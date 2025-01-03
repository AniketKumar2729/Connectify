import dotenv from "dotenv";
import mongoose from "mongoose"
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64 } from "../lib/helper.lib.js";
dotenv.config();
export const connectDB = (uri) => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("database is connected");
    }).catch((error) => console.log(error)
    )
}
export const cookieOption = {
    maxAge: 15 * 24 * 60 * 60 * 1000,//cookie is valid for 15 days
    sameSite: 'none',
    httpOnly: true,
    secure: true
}
export const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    return res.status(code).cookie('Connectify-token', token, cookieOption).json({
        success: true,
        message,
        user
    })
}

export const emitEvent = (req, event, users, data) => {
    console.log("emitting event", event);
}

export const uploadFileIntoCloudinary = async (files = []) => {
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(getBase64(file), {
                resource_type: "auto",
                public_id: uuid()
            }, (error, result) => {
                if (error) return reject(error)
                resolve(result)
            })
        })
    }
    );
    try {
        // Await All Uploads
        const results = await Promise.all(uploadPromises);
        // Format Results
        const formattedResult = results.map((result) => ({
            public_id: result.public_id,
            url: result.secure_url,
        }));
        return formattedResult;
    } catch (error) {
        throw new Error("Error uploading files to Cloudinary",error);
    }
};


export const deleteFilesFromCloudinary = async (public_ids) => {

}