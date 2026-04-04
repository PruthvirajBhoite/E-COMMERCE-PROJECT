import Seller from "../model/seller.js";
import VerificationCode from "../model/VerificationCode.js";
import generateotp from "../util/generateotp.js";
import jwtProvider from "../util/jwtProvider.js";
import sendVerificationEmail from "../util/sendemail.js";
import SellerService from "./SellerService.js";
import bcrypt from "bcrypt";

class AuthService{

    async sendLoginOTP(email){

        const SIGNIN_PREFIX = "signin_";

        if(email.startsWith(SIGNIN_PREFIX)){
        email = email.substring(SIGNIN_PREFIX.length);
         const seller = await Seller.findOne({email});
         const user = await User.findOne({email});

         if(!seller && !user) throw new Error("User not found");

        }

         const exitingVerificationCode = await VerificationCode.findOne({email});

         if(exitingVerificationCode){
            await VerificationCode.deleteOne({email});

         }

         const otp = generateotp();

         const verificationCode = new VerificationCode({otp,email});

         await verificationCode.save();

         //send email to user

         const subject = "Pruthvi Bhoite Login/Signup OTP";
         const body = `your OTP is ${otp}. Please enter it to complete your login 
         process`;

         await sendVerificationEmail(email,subject,body)
    }


    async createUser(req){
         const {email,fullName} = req;

         let user = await user.findOne({email});

         if(user){
            throw new Error("User are already exists with email")

         }

         const verificationCode = await VerificationCode.findOne({email});

         if(!verificationCode || verificationCode.otp!==otp){
            throw new Error("Invalid OTP...");
         }

         user = new user({
            email,fullName,password: bcrypt.hash(12345678,10)
         })

         await user.save();

         const cart = new Cart({user:user._id})
         await cart.save();

         return jwtProvider.createJwt({email})

    }
    async sigin(req){
        const {email,otp} = req;

        const user = await user.findOne({email});

        if(!user){
            throw new Error("User not found with email")
        }

        const verificationCode = await VerificationCode.findOne({email});

        if(!verificationCode || verificationCode.otp!==otp){
            throw new Error("Invalid OTP");
        }
        return {
            message:"Login success",
            jwt:jwtProvider.createJwt({email})
            // role:user.role
        }
    }
}

export default AuthService;