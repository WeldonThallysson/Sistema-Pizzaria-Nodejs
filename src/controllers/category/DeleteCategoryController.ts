import { Request,Response } from "express";
import {DeleteCategoryServices} from '../../services/category/DeleteCategoryService'

class DeleteCategoryController {
    async handle(req: Request, res: Response){
        const category_id = req.query.category_id as string

        const deleteCategory = new DeleteCategoryServices()

        const deleted = await deleteCategory.execute({category_id})
      
        return res.json(deleted)
    }
} 


export {DeleteCategoryController}



