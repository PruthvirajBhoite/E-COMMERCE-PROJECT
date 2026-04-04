import mongoose from "mongoose";
import UserRoles from "../domain/UserRole";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    mobile:{
        type:String
    },
    addresses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Address",
        },
    ],
    role:{
        type:String,
        enum:[UserRoles.CUTOMER,UserRoles.ADMIN],
        default:UserRoles.CUTOMER
    }
})

export default userSchema;