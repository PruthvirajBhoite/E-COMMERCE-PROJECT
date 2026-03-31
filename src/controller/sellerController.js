import jwtProvider = require("../util/jwtProvider");

class SellerController{


    async getSellerProfile(req,res){
        try{
            const jwt = req.headers.authorization.split(" ")[1]
            const seller = await sellerServcie.getSellerProfile(jwt);

            res.status(200).json(seller);

        }catch(error){
          res.status(error instanceof Error ? 404:500)
          .json({message:error.message})
        }
    }
     async createSeller(req,res){
        try{
            const seller = await sellerServcie.createSeller(req.body);

            res.status(200).json({message:"seller created sucessfully "});

        }catch(error){
          res.status(error instanceof Error ? 404:500)
          .json({message:error.message})
        }
    }
    async getAllSeller(req,res){
        try{
            const status = req.query.status
            const seller = await sellerServcie.getAllSeller(status);

            res.status(200).json(seller);

        }catch(error){
          res.status(error instanceof Error ? 404:500)
          .json({message:error.message})
        }
    }
    async updateSeller(req,res){
        try{
            const existingSeller = await req.seller
            const seller = await sellerServcie.updateSeller(existingSeller,req.body);

            res.status(200).json(seller);

        }catch(error){
          res.status(error instanceof Error ? 404:500)
          .json({message:error.message})
        }
    }
    async updateSeller(req,res){
        try{
            await sellerServcie.deleteSeller(req.params.id);

            res.status(200).json({message:"seller deleted..."});

        }catch(error){
          res.status(error instanceof Error ? 404:500)
          .json({message:error.message})
        }
    }
    async updateSellerAccountStatus(req,res){
        try{
           const updatedSeller = await sellerServcie.updateSellerStatus(
            req.params.id,
            req.params.status
           )
         res.status(200).json(updatedSeller);
        }catch(error){
          res.status(error instanceof Error ? 404:500)
          .json({message:error.message})
        }
    }

    async verifyLoginOtp(req,res){
        try{
            const{otp,email} = req.body;
            const seller = await sellerServcie.getSellerByEmail(email);

            const verificationCode = await verificationCode.findOne({email})

            if(verificationCode || verificationCode.otp=otp){
                throw new Error("Invalid OTP")
            }

            const token = jwtProvider.createJwt({email});

            const authResponse={
                message:"Login Success",
                jwt:token,
                role:UserRoles.SELLER
            }

            return res.status(200).json(authResponse)

        }catch(error){
           res.status(error instanceof Error ? 404 : 500)
           .json({message:error.message})
        }
    }
}