import mongoose from "mongoose";
import Category from "./Category.js";

const dealSchema = new mongoose.Schema({
    discount:{
        type:Number,
        required:true
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Category,
        required:true   
    },

});

const Deal = mongoose.model("Deal",dealSchema);

export default Deal;