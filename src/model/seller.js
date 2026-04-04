import mongoose from "mongoose";
import UserRoles from "../domain/UserRole.js";
import AccountStatus from "../domain/AccountStatus.js";

const sellerSchema = new mongoose.Schema({
    sellerName:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    businessDetails:{
        businessName:{
            type:String,
        },
        businessEmail:{
            type:String,
        },
        businessMobile:{
            type:String,
        },
        businessAddress:{
            type:String,
        }
    },
    bankDetails:{
        accountNumber:{
            type:String,
        },
        accountHolderName:{
            type:String,
        },
        bankName:{
            type:String,
        },
        ifscCode:{
            type:String,
        }
    },
    picupAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },
    GSTIN:{
        type:String,
        rquired:true
    },
    role:{
        type:String,
        enum:[UserRoles.SELLER],
        default:UserRoles.SELLER
    },
    accountStatus:{
        type:String,
        enum:[AccountStatus.PENDING_VERIFICATION,
            AccountStatus.ACTIVE,
            AccountStatus.SUSPENDED,
            AccountStatus.DEACTIVATED,
            AccountStatus.BANNED,
            AccountStatus.CLOSED],
        default:AccountStatus.PENDING_VERIFICATION
    }
}, {timestamps:true});

const Seller = mongoose.model("Seller",sellerSchema);

export default Seller;

