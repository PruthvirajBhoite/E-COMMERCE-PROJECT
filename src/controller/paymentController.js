import paymentService from "../service/paymentService.js";
import UserService from "../service/userService.js";
import OrderService from "../service/orderService.js";
import SellerService from "../service/SellerService.js";
import SellerReportService from "../service/sellerReportService.js";
import TransactionService from "../service/transactionService.js";
import Cart from "../model/cart.js";
// import PaymentOrder from "../model/paymentOrder.js";
// import razorpay from "../config/razorpayClient.js";   

const paymentSuccessHandler = async (req,res) =>{
    const {paymentId} = req.params;
    const {paymentLinkId} = req.query;

    try{
        const user = await req.user;

        const paymentOrder = await paymentService.getPaymentOrderByPaymentId(paymentLinkId);

        const paymentSuccess = await paymentService.proceedPaymentOrder(
            paymentOrder,
            paymentId,
            paymentLinkId
        );
        if(paymentSuccess){
            for(let orderId of paymentOrder.orders){
                const order = await OrderService.findOrderById(orderId);

                await TransactionService.createTransaction(order);

                const seller = await SellerService.getSellerById(order.seller);
                const sellerReport = await SellerReportService.getSellerReport(seller);

                sellerReport.totalOrders += 1;
                sellerReport.totalEarnings += order.totalSellingPrice;
                sellerReport.totalSales += order.orderItems.length;

                const updatedReport = await SellerReportService.updateSellerReport(sellerReport);
                console.log("Updated Seller Report:",updatedReport);    
            }

            await Cart.findOneAndUpdate(
                {user:user._id},
                {cartItems:[]},
                {new:true}
            );
            return res.status(201).json({
                message:"payment successful",
            });
        }else{
            return res.status(400).json({
                message:"payment failed"
            });
        }
    }catch(err){
        return res.status(500).json({
            message:`Error processing payment: ${err.message}`
        });
    }
};

export default {
    paymentSuccessHandler
};