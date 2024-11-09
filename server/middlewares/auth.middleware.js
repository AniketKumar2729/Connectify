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
