export const TryCatch=(passedFun)=>async(req,res,next)=>{
    try {
        await passedFun(req,res,next)
    } catch (error) {
        next(error)
    }
}

export const errorHandler=(statusCode,message)=>{
    // this function is simply getting the error from the various part of the backend file and generating a new error object and returning it to the part from where the error came
    const error= new Error();
    error.statusCode=statusCode;
    error.message=message;
    return error;
}

export const errorMiddleware=(err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    if (err.code === 11000) {
        const error = Object.keys(err.keyPattern).join(",")
        message = `Duplicate field -> ${error}`
        statusCode = 400
    }
    if (err.name === "CastError") {
        const errorPath = err.path
        message = `Invalid format of -> ${errorPath}`
        statusCode = 400
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        // err
        message,
    });
}