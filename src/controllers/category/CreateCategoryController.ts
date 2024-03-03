import { Request,Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";



class CreateCategoryController{
    async handle(req: Request, res: Response){

        const { name } = req.body
        const createCategoryService = new CreateCategoryService()
      
         
        try{
            const category = await createCategoryService.execute({name});
            return res.json(category);
        } catch(error){
            return res.status(401).json({error: error.message})
        }
   
         
         
       
    }
    
}


export { CreateCategoryController }