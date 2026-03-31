import mongoose from "mongoose";

const verificationCodeSchema = new Schema({
    otp:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },

})

const verifcationCode = mongoose.model("verificationCode",verificationCodeSchema)

module.exports = verificationCode;