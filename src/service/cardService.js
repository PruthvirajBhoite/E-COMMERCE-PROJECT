import Cart from "../model/cart.js";
import CartItem from "../model/cartItem.js"; // ✅ add this

class CartService {

    async findUserCart(user){
        let cart = await Cart.findOne({ user: user._id });

        // ✅ handle null cart
        if(!cart){
            throw new Error("Cart not found");
        }

        let totalPrice = 0;
        let totalDiscountedPrice = 0;

        let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

        let totalItem = cartItems.length;

        cartItems.forEach((cartItem) => {
            totalPrice += cartItem.mrpPrice;  // ✅ FIXED
            totalDiscountedPrice += cartItem.sellingPrice;
        });

        cart.totalMrpPrice = totalPrice;
        cart.totalSellingPrice = totalDiscountedPrice;
        cart.totalItem = totalItem;

        // ✅ simple discount calc
        cart.discount = totalPrice > 0 
            ? Math.floor(((totalPrice - totalDiscountedPrice) / totalPrice) * 100)
            : 0;

        cart.cartItems = cartItems;

        return cart;
    }

    async addCartItem(user, product, size, quantity){
        const cart = await this.findUserCart(user);

        let isPresent = await CartItem.findOne({
            cart: cart._id,
            product: product._id,
            size: size
        }).populate("product");

        if(!isPresent){
            const cartItem = new CartItem({
                product,
                quantity,
                userId: user._id,
                sellingPrice: quantity * product.sellingPrice,
                mrpPrice: quantity * product.mrpPrice,
                size,
                cart: cart._id
            });

            return await cartItem.save();
        }

        return isPresent;
    }
}

// ✅ create instance
const cartService = new CartService();

// ✅ export instance
export default cartService;