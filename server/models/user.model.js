import { Schema, model, models } from "mongoose";

const userSchema = new Schema({

})

export const User = models.User || model('User', userSchema);