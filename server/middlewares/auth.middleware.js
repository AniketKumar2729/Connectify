import jwt from 'jsonwebtoken'

import { errorHandler, TryCatch } from "./errorHandler.middleware.js";

export const isAuthenticated = TryCatch(async (req, res, next) => {
    //     console.log("cookie:- ",req.cookies['Connectify-token']);
    const token = req.cookies['Connectify-token'];
    if (!token)
        return next(errorHandler(401, "Please login to handle this route"));
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId=decodedData._id  
    next();
}
)
export const adminOnly = TryCatch(async (req, res, next) => {
    //     console.log("cookie:- ",req.cookies['Connectify-token']);
    const token = req.cookies['Connectify-admin-token'];
    if (!token)
        return next(errorHandler(401, "Only Admin can access"));
    const adminId = jwt.verify(token, process.env.JWT_SECRET);
    const adminSecretKey=process.env.ADMIN_SECRET_KEY||"abcde"
    const isMatched=adminId===adminSecretKey
    if(!isMatched)
        return next(errorHandler(401,"Invalid secret key"))
    next();
}
)
