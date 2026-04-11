import TransactionService from "../service/transactionService.js";

class TransactionController{
    async getTransactionsBySellerId(req,res){
        try{
            const seller  = await req.seller;
            const transactions = await TransactionService.getTransactionsBySellerId(seller._id);
            return res.status(200).json(transactions);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new TransactionController();