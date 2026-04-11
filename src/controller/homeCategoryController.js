import HomeCategoryService from "../service/homeCategoryService.js";
import homeService from "../service/homeService.js";

class HomeCategoryController{
    async createHomeCategories(req,res){
        try{
            const homeCategories = req.body;
            const categories = await HomeCategoryService.createCategories(homeCategories);

            const home = await homeService.createHomePageData(categories);


            return res.status(201).json(home);
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
        
    }

    async getHomeCategory(req,res){
        try{
            const Categories = await HomeCategoryService.getAllHomeCategories();
            return res.status(200).json(Categories);
        }catch(error){
            return res.status(500).json({ error: error.message });  
        }
    }

    async updateHomeCategory(req,res){
        try{
            const id = req.params.id;
            const homeCategory = req.body;
            const updatedCategory = await HomeCategoryService.updateHomeCategory(homeCategory,id);
            return res.status(200).json(updatedCategory);
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new HomeCategoryController();