import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    mrp:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    },
    discountPercent:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    color:{
        type:Number,
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