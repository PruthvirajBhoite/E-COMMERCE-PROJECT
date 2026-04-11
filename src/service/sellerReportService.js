// import SellerReport from "../model/sellerReport";
import SellerReport from "../model/sellerReport.js";

class SellerReportService{
    async getSellerReport(seller){
        try{
            let sellerReport = await SellerReport.findOne({seller:seller._id});
            console.log("Seller Report:",sellerReport);

            if(!sellerReport){
                sellerReport = new SellerReport({
                    seller:seller._id,
                    totalOrders:0,
                    totalEarnings:0,
                    totalSales:0,
                });
                sellerReport = await sellerReport.save();
            }
            return sellerReport;
        }catch(err){
            throw new Error(`Error fetching seller report: ${err.message}`);
        }

    }

    async updateSellerReport(sellerReport){
        try{
            return await SellerReport.findByIdAndUpdate(
                sellerReport._id,
                sellerReport,
                {new:true}
            );
        }catch(err){
            throw new Error(`Error updating seller report: ${err.message}`);        
        }
    }

}

export default new SellerReportService();