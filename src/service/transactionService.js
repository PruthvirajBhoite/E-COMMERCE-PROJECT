import Transaction from "../model/transaction.js";
import Seller from "../model/seller.js";
import Order from "../model/order.js";

class TransactionService{
    async createTransaction(orderId){
        const order = await Order.findById(orderId).populate("seller");
        if(!order){
            throw new Error("Order not found");
        }   

        const seller = await Seller.findById(order.seller._id);
        if(!seller){
            throw new Error("Seller not found");
        }       

        const transaction = new Transaction({
            customer:order.user,
            order:order._id,
            seller:seller._id
        });
        return await transaction.save();

    }

    async getTransactionsBySellerId(sellerId){
        return await Transaction.find({ seller: sellerId }).populate("order");
    }

    async getAllTransactions(){
        return await Transaction.find().populate("seller order customer");
    }

}

export default new TransactionService();