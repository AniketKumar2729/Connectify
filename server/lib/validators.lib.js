import { body,param, validationResult,check, query } from 'express-validator'
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
export const newGroupValidator = () => [
    body("name","Please enter name").notEmpty(),
    body("members").notEmpty().withMessage("Please add members").isArray({min:2,max:100}).withMessage("Members should be between 2-100"),
]
export const addNewMemberValidator = () => [
    body("groupId","Please provide Group ID").notEmpty(),
    body("members").notEmpty().withMessage("Please add members").isArray({min:1,max:97}).withMessage("Members should be between 1-97"),
]
export const removeMemberValidator = () => [
    body("userId","Please provide user ID").notEmpty(),
    body("groupId","Please provide group ID").notEmpty()
]
export const leaveGroupValidator = () => [
    param("id","Please provide Chat ID").notEmpty(),
]
export const sendAttachmentsValidator = () => [
    body("chatId","Please provide Chat ID").notEmpty(),
    check('files').notEmpty().withMessage("Please upload attachments").isArray({min:1,max:5}).withMessage("Attachments should be between 1-5"),
]
export const getMessageValidator = () => [
    param("id","Please provide Chat ID").notEmpty(),
]
export const getGroupDetailsValidator = () => [
    param("id","Please provide Group ID").notEmpty(),
]
export const renameGroupValidator = () => [
    param("id","Please provide Group ID").notEmpty(),
    body("groupname","Please  provide group new name").notEmpty()
]
export const deleteChatValidator = () => [
    param("id","Please provide Chat ID").notEmpty(),
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