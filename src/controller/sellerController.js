import jwtProvider from "../util/jwtProvider.js";
import UserRole from "../domain/UserRole.js";
import SellerService from "../service/SellerService.js";
import VerificationCode from "../model/VerificationCode.js";

class SellerController {

    async getSellerProfile(req, res){
        try{
            const profile = await req.seller;
            console.log("profile",profile);
            
            const jwt = req.headers.authorization.split(" ")[1];
            const seller = await SellerService.getSellerProfile(jwt);
            res.status(200).json(seller);
        }catch(error){
            res.status(error instanceof Error ? 400 : 500).json({message:error.message});
        }
    }

    async createSeller(req,res){
        try{
            await SellerService.createSeller(req.body);
            res.status(200).json({message:"Seller created successfully"});
        }catch(error){
            res.status(error instanceof Error ? 400 : 500).json({message:error.message});
        }
    }

    async getAllSeller(req,res){
        try{
            const status = req.query.status;
            const sellers = await SellerService.getAllSeller(status);
            res.status(200).json(sellers);
        }catch(error){
            res.status(error instanceof Error ? 400 : 500).json({message:error.message});
        }
    }

    async updateSeller(req,res){
        try{
            const existingSeller = req.seller;
            const seller = await SellerService.updateSeller(existingSeller, req.body);
            res.status(200).json(seller);
        }catch(error){
            res.status(error instanceof Error ? 400 : 500).json({message:error.message});
        }
    }

    async deleteSeller(req,res){
        try{
            await SellerService.deleteSeller(req.params.id);
            res.status(200).json({message:"Seller deleted"});
        }catch(error){
            res.status(error instanceof Error ? 400 : 500).json({message:error.message});
        }
    }

    async updateSellerAccountStatus(req,res){
        try{
            const updatedSeller = await SellerService.updateSellerStatus(req.params.id, req.params.status);
            res.status(200).json(updatedSeller);
        }catch(error){
            res.status(error instanceof Error ? 400 : 500).json({message:error.message});
        }
    }

    async verifyLoginOtp(req,res){
        try{
            const {otp, email} = req.body;
            const seller = await SellerService.getSellerByEmail(email);

            const codeEntry = await VerificationCode.findOne({email});

            if(!codeEntry || codeEntry.otp !== otp){
                throw new Error("Invalid OTP");
            }

            const token = jwtProvider.createJwt({email});

            const authResponse = {
                message: "Login Success",
                jwt: token,
                role: UserRole.SELLER
            };

            return res.status(200).json(authResponse);

        }catch(error){
            res.status(error instanceof Error ? 400 : 500).json({message:error.message});
        }
    }
}

export default new SellerController();