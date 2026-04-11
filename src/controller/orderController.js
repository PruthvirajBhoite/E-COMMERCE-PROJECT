import orderService from "../service/orderService.js";
import CartService  from "../service/cardService.js";
import UserService from "../service/userService.js";
// import OrderError from "../exceptions/OrderError.js";
// import PaymentMethod from "../domain/PaymentMethod.js";
// import PaymentMethod from "../service/PaymentService.js";
// import PaymentOrder from "../model/PaymentOrder.js";

class OrderController{

    async createOrder(req,res,next){
        const {shippingAddress} = req.body;
        const {paymentMethod} = req.query;
        const jwt = req.headers.authorization;
    

    try{
        const user = await req.user;

        const cart = await CartService.findUserCart(user);
        const orders = await orderService.createOrder(user,shippingAddress,cart)


        const paymentOrder = await paymentService.createOrder(user,orders);

        const response = {}

        if(paymentMethod === "RAZORPAY"){
            const payment = await paymentService.createRazorypayPaymentLink(
                user,
                paymentOrder.amount,
                paymentOrder._id
            )
            response.payment_link_url = payment.short_url;
            paymentOrder.paymentLinkId = payment.id;
            await paymentOrder.findByIdAndUpdate(paymentOrder._id,paymentOrder);
        }

        return res.status(200).json(orders);
    }catch(error){
        console.log("error",error)
        return res,status(500).json({message:`Error creating order :${error.message}`})
    }
}
   
   async getOrderById(req,res,next){
    try{
        const {orderId} = req.params;
        const order = await orderService.findOrderById(orderId);
        return res.status(200).json(order);
    }catch(error){
        return res.status(401).json({error:error.message})
    }
   }

   async getOrderItemById(req,res,next){
    try{
        const {orderItemId} = req.params;
        const orderItem = await orderService.findOrderItemById(orderItemId);
        return res.status(200).json(orderItem);
    }catch(error){
        return res.status(401).json({error:error.message});
    }
   }

   async getUserOrderHistory(req,res){
    try{
        const userId = await req.user._id;
        const orderHisttory = await orderService.usersOrderHistory(userId);
     return res.status(200).json(orderHisttory);
    }catch(error){
        return res.status(401).json({error:error.message});
    }
   }

   
   async getSellersOrders(req,res){
    try{
        const sellerId =  req.seller._id;
        const orderHisttory = await orderService.getSellersOrders(sellerId);
     return res.status(200).json(orders);
    }catch(error){
        return res.status(401).json({error:error.message});
    }
   }

   
   
   async updateOrderStatus(req,res){
    try{
        const {orderId,orderStatus} = req.params;
        const updateOrder = await orderService.updateOrderStatus(orderId,orderStatus);
     return res.status(200).json(orders);
    }catch(error){
        return res.status(401).json({error:error.message});
    }
   }

    async cancelOrder(req,res){
    try{
        const {orderId} = req.params;
        const userId = req.user._id;
        const cancelOrder = await orderService.updateOrderStatus(orderId,userId);
     return res.status(200).json({
        message:"Order cancelled successfully",
        order:cancelOrder,
     });
    }catch(error){
        return res.status(401).json({error:error.message});
    }
   }

//     async deleteOrder(req,res){
//     try{
//         const {orderId} = req.params;
//         await OrderService.deleteOrder(orderId);
//      return res.status(200).json({ message:"Order deleted successfully"});
//     }catch(error){
//         return res.status(401).json({error:error.message});
//     }
//    }

}

export default new OrderController();