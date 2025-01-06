import { body, param, validationResult } from 'express-validator'
import { errorHandler } from '../middlewares/errorHandler.middleware.js'
export const registerValidator = () => [
    body("name", "Please enter name").notEmpty(),
    body("username", "Please enter username").notEmpty(),
    body("bio", "Please enter bio").notEmpty(),
    body("password", "Please enter passsword").notEmpty(),
]
export const loginValidator = () => [
    body("username", "Please enter username").notEmpty(),
    body("password", "Please enter passsword").notEmpty(),
]
export const newGroupValidator = () => [
    body("name", "Please enter name").notEmpty(),
    body("members").notEmpty().withMessage("Please add members").isArray({ min: 2, max: 100 }).withMessage("Members should be between 2-100"),
]
export const addNewMemberValidator = () => [
    body("groupId", "Please provide Group ID").notEmpty(),
    body("members").notEmpty().withMessage("Please add members").isArray({ min: 1, max: 97 }).withMessage("Members should be between 1-97"),
]
export const removeMemberValidator = () => [
    body("userId", "Please provide user ID").notEmpty(),
    body("groupId", "Please provide group ID").notEmpty()
]
export const leaveGroupValidator = () => [
    param("id", "Please provide Chat ID").notEmpty(),
]
export const sendAttachmentsValidator = () => [
    body("chatId", "Please provide Chat ID").notEmpty(),
]
export const getMessageValidator = () => [
    param("id", "Please provide Chat ID").notEmpty(),
]
export const getGroupDetailsValidator = () => [
    param("id", "Please provide Group ID").notEmpty(),
]
export const renameGroupValidator = () => [
    param("id", "Please provide Group ID").notEmpty(),
    body("groupname", "Please  provide group new name").notEmpty()
]
export const deleteChatValidator = () => [
    param("id", "Please provide Chat ID").notEmpty(),
]
export const friendRequestValidator = () => [
    body("receiverId", "Please provide an valid ID").notEmpty(),
]
export const friendRequestAcceptValidator = () => [
    body("accept").notEmpty().withMessage("Please add accept").isBoolean().withMessage("Accept must be Yes or No"),
    body("requestId", "Please provide request ID").notEmpty(),
]
export const adminLoginValidator=()=>[
    body('secretKey').notEmpty().withMessage("Please provide the secret key")
]
export const validateHandler = (req, res, next) => {
    const errors = validationResult(req)
    const errorMessage = errors.array().map((error) => error.msg).join(", ")
    console.log(errorMessage);
    if (errors.isEmpty())
        return next()
    else
        next(errorHandler(400, errorMessage))

}