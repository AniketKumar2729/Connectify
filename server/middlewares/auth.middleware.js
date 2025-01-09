import jwt from 'jsonwebtoken'

import { errorHandler, TryCatch } from "./errorHandler.middleware.js";
import { User } from '../models/user.model.js';

export const isAuthenticated = TryCatch(async (req, res, next) => {
    //     console.log("cookie:- ",req.cookies['Connectify-token']);
    const token = req.cookies['Connectify-token'];
    if (!token)
        return next(errorHandler(401, "Please login to handle this route"));
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData._id
    next();
}
)
export const adminOnly = TryCatch(async (req, res, next) => {
    //     console.log("cookie:- ",req.cookies['Connectify-token']);
    const token = req.cookies['Connectify-admin-token'];
    if (!token)
        return next(errorHandler(401, "Only Admin can access"));
    const adminId = jwt.verify(token, process.env.JWT_SECRET);
    const adminSecretKey = process.env.ADMIN_SECRET_KEY || "abcde"
    const isMatched = adminId === adminSecretKey
    if (!isMatched)
        return next(errorHandler(401, "Invalid secret key"))
    next();
}
)

export const socketAuthenticator = async (err, socket, next) => {
    try {
        if (err) {
            return next(err)
        }
        const authToken = socket.request.cookies['Connectify-token']
        if (!authToken)
            return next(errorHandler(401, "Please Login to access this route"))
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET)
        const user = await User.findById(decodedToken._id)
        if (!user)
            return next(errorHandler(401, "Please Login to access this route"))
        socket.user = user
        return next();
    } catch (error) {
        console.log(error);
        return next(errorHandler(401, "Please Login to access this route"))
    }
}
