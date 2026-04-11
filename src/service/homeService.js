import HomeCategorySection from "../domain/homeCategorySection.js";
import Deal from "../model/deal.js";

class HomeService{
    async createHomePageData(allCategories){

        const gridCategories = allCategories.filter(
            (category)=>category.section===HomeCategorySection.GRID);

        const shopByCategories = allCategories.filter(
            (category)=>category.section===HomeCategorySection.SHOP_BY_CATEGORIES   
        );
        const electricCategories = allCategories.filter(
            (category)=>category.section===HomeCategorySection.ELETRIC_CATEGORIES   
        );
        const eletricCategories = allCategories.filter(
            (category)=>category.section===HomeCategorySection.ELETRIC_CATEGORIES   
        );

        const dealCategories = allCategories.filter(
            (category)=>category.section===HomeCategorySection.DEALS   
        );

        const deals = await DealService.getDeals();

        const home={
            grid:gridCategories,
            shopByCategories:shopByCategories,
            electricCategories:electricCategories,
            deals:deals,
            dealCategories:dealCategories
        };

        return home;
    }
}

export default new HomeService();