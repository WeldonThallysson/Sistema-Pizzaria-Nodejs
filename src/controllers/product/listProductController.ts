import { Response, Request } from "express";
import { ListProductService } from "../../services/product/listProductSevice";


class ListProductController{
    async handle(req:Request, res: Response){
  
         const category_id = req.query.category_id as string;

         const ListProduct = new ListProductService();

         const product = await ListProduct.execute({category_id});

         return res.json(product)

    }
}

export {ListProductController}