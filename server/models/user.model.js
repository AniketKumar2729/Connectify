import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false // whenever we will call the user collection every thing will come but password will not come.It will come only when we will forcefully call him.
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
},{
    timestamps:true
})

export const User = models.User || model('User', userSchema);