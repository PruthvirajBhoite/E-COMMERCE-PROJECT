import SellerReportService from "../service/sellerReportService.js";

class SellerReportController{
    async getSellerReport(req,res){
        try{
            const seller = await req.seller;
            const Report = await SellerReportService.getSellerReport(seller._id);
            return res.status(200).json(Report);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
}
}

export default new SellerReportController();