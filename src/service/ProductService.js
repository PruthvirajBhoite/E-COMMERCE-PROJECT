import Category from "../model/Category.js";
import Product from "../model/product.js";


export const calculateDiscountPrecentage = (mrpPrice,sellingPrice)=>{
    if(mrpPrice<=0){
        throw new Error("MRP Price should be greater then zero");
    }

    const discount = mrpPrice - sellingPrice;

    return Math.round((discount/mrpPrice)*100)
}
class ProductService{

    async createProduct(req,seller){
      try{
        const discountPercent = calculateDiscountPrecentage(
            req.mrpPrice,
            req.sellingPrice
        );

        const category1 = await this.createOrGetCategory(req.category,1);
        const category2 = await this.createOrGetCategory(req.category2,2,category1._id);
        const category3 = await rhis.createOrGetCategory(req.category3,3,category2._id);

        const product = new ProductService({
            title:req.title,
            description:req.description,
            images:req.images,
            sellingPrice:req.sellingPrice,
            mrpPrice:req.mrpPrice,
            discountPercent,
            size:req.sizes,
            quantity:req.quantity,
            color:req.color,
            seller:seller._id,
            categories:category3._id,
        });

        return await product.save();

      }catch(error){
           throw new Error(error.message)
      }
    }
    async createOrGetCategory(categoryId,level,parentId=null){
        let category = await Category.findOne({categoryId});

        if(!category){
            category = new Category({
                categoryId,
                level:level,
                parentId:parentId
            });
            category = await category.save();
        }
        return category;
    }

    async deleteProduct(productId){
        try{
            const product = await ProductService.findByIdAndDelete(productId);
            if(!product){
                throw new Error("Product not found")
            }
            return product;
        }catch(error){
            throw new Error(error.message)
        }
    }
    async updateProduct(productId,updateProductData){
        try{
            const product = await ProductService.findByIdAndUpdate(productId,updateProductData,{new:true});
            return product;
        }catch(error){
            throw new Error(error.message)
        }
    }

    async findProductById(productId){
        try{
            const product = await ProductService.findById(productId);
            if(!product){
                throw new Error("Product not found")
            }
            return product;
        }catch(error){
            throw new Error(error.message)
        }
    }

    async searchProduct(query){
        try{
            const products = await ProductService.find({title:new RegExp(query,"i")});
            return products;
        }catch(error){
            throw new Error(error.message)
        }
    }

    async getProductsBySeller(sellerId){
        return await ProductService.find({seller:sellerId});
    }

    async getAllProducts(req){
        const filterQuery={};

        if(req.category){
            const category = await Category.findOne({categoryId:req.category});

            if(!category){
                return {
                    content : [],
                    totalpages:0,
                    totalElement:0
                }
            }
            filterQuery.category =category._id.toString();
        }
        if(req.color){
            filterQuery.color = req.color;
        }

        if(req.minPrice && req.maxPrice){
            filterQuery.sellingPrice = {$gte:req.minPrice,$lte:req.maxPrice};
        }

        if(req.minDiscount){
            filterQuery.discountPercent = {$gte:req.minDiscount};
        }

        if(req.size){
            filterQuery.size = req.size;
        }
        let sortQuery = {};
        if(req.sort==="price_low"){
            sortQuery.sellingPrice = 1;
        }else if(req.sort=="price_high"){
            sortQuery.sellingPrice=-1;
        }

        const products = await ProductService.find(filterQuery)
        .sort(sortQuery)
        .skip(req.pageNumber * 10)
        .limit(10);

        const totalElement = await ProductService.countDocuments(filterQuery);

        const tottalpages = Math.ceil(totalElement/10)

        const res = {
            content:products,
            totalpages:totalpages,
            totalElement:totalElement
        }
        return res;
    }
}

export default new ProductService();