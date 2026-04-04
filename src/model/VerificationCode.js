import mongoose from "mongoose";


const { Schema } = mongoose;

const verificationCodeSchema = new Schema({
    otp: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
});


const verificationCode = mongoose.model("VerificationCode", verificationCodeSchema);

export default verificationCode;