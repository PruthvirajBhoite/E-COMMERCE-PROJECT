import Category from "../model/Category.js";
import HomeCategory from "../model/homeCategory.js";

class HomeCategoryService {

    async getAllHomeCategories(){ 
        return await HomeCategory.find();
    }

    async createHomeCategory(homeCategory){
        return await HomeCategory.create(homeCategory);
    }

    async createHomeCategory(homeCategory){
        return await HomeCategory.create(homeCategory);
    }

    async createCategories(homeCategories){
        const existingCategories = await HomeCategory.find();

        if(existingCategories.length==0){
            return await HomeCategory.insertMany(homeCategories);
        }
        return existingCategories;
    }

    async updateHomeCategory(homeCategory,id){
        const existingCategory = await HomeCategory.findById(id);
        if(!existingCategory){
            throw new Error("Category not found");
        }
        return await HomeCategory.findByIdAndUpdate(
            existingCategory._id,
            Category,
            {new :true}
        )
    }
}

export default new HomeCategoryService();