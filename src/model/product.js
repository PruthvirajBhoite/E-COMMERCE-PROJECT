import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title:{
        typeof:String,
        required:true,
        trim:true
    },
    description:{
        typeof:String,
        required:true,
        trim:true
    },
    mrp:{
        typeof:Number,
        required:true
    },
    sellingPrice:{
        typeof:Number,
        required:true
    },
    discountPercent:{
        typeof:Number,
        required:true
    },
    quantity:{
        typeof:Number,
        required:true
    },
    color:{
        typeof:Number,
        required:true
    },
    image:{
        type:[String],
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"seller",
        required:true
    },
    size:{
        type:String,
        required:true
    }
})

const Product = mongoose.model("Product",ProductSchema);

export default Product;