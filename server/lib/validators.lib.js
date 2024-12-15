import { body, validationResult,check } from 'express-validator'
import { errorHandler } from '../middlewares/errorHandler.middleware.js'
export const registerValidator = () => [
    body("name","Please enter name").notEmpty(),
    body("username","Please enter username").notEmpty(),
    body("bio","Please enter bio").notEmpty(),
    body("password","Please enter passsword").notEmpty(),
    check('avatar',).notEmpty().withMessage("Please upload you image")
]
export const loginValidator = () => [
    body("username","Please enter username").notEmpty(),
    body("password","Please enter passsword").notEmpty(),
]
export const validateHandler = (req, res, next) => {
    const errors = validationResult(req)
    const errorMessage=errors.array().map((error)=>error.msg).join(", ")
    console.log(errorMessage);
    if (errors.isEmpty())
        return next()
    else
    next(errorHandler(400,errorMessage))

}