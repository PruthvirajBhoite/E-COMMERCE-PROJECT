import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    mrpPrice: {
        type: Number, // ✅ fixed
        required: true
    },
    sellingPrice: {
        type: Number, // ✅ fixed
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId, // ✅ fixed
        ref: "User",
        required: true
    }
});

// ✅ FIXED model creation
const CartItem = mongoose.models.CartItem || mongoose.model("CartItem", cartItemSchema);

export default CartItem;