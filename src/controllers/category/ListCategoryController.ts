

import { Request,Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";


class ListCategoryController{
    async handle(req:Request,res:Response){

        
        const listCategories = new ListCategoryService()
        const category = await listCategories.execute();

        return res.json(category)


    }
}

export { ListCategoryController }