
import ProductService from "../service/ProductService.js";


class SellerProductController{
    async getProductBySellerId(req,res){
        try{
            const seller = await req.seller;

            const products = await ProductService.getProductBySeller(seller._id);
            return res.status(200).json(products);
        }catch(error){
             res.status(400).json({error:error.message});
        }
    }
    async createProduct(req,res){
        try{
            await createProductSchema.validate(req.body,{abortEarly:false});

            const seller = await req.seller;
            const product = await ProductService.createProduct(req.body,seller);
            return res.status(201).json(product);
        }catch(error){
            
            // if(error instanceof Yup.ValidationError){
            //     return res.status(400).json({
            //         error:"Validate error",
            //         errors:error.errors,
            //         count:error.errors.length,
            //     });
            // }
             res.status(400).json({error:error.message});
        }
    }
    async deleteProduct(req,res){
        try{
            await ProductService.deleteProduct(req.params.productId);
            return  res.status(200).json({message:"Product deleted successfully"});
        }catch(error){
           res.status(404).json({error:error.message});
        }
    }

    async updateProduct(req,res){
        try{
            const product = await ProductService.updateProduct(
                req.params.productId,
                req.body
            );
            return res.status(200).json(product);
        }catch(error){
           res.status(404).json({error:error.message});
        }
    }

    async getProductById(req,res){
        try{
            const product = await ProductService.findProductById(
                req.params.productId
            );
            return res.status(200).json(product);
        }catch(error){
          res.status(404).json({error:error.message});
        }
    }

    async searchProduct(req,res){
        try{
            const query = req.query.q;
            const products = await ProductService.searchProduct(query);
            return res.status(200).json(products);
        }catch(error){
            res.status(404).json({error:error.message});
        }
    }

    async getAllProducts(req,res){
        try{
            const products = await ProductService.getAllProducts(req.query);
            return res.status(200).json(products);
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
}

export default new SellerProductController;