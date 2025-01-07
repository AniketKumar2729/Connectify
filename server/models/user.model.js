import mongoose,{ Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    bio:{
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

userSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password,10);
})

export const User =mongoose.models.User || model('User', userSchema);