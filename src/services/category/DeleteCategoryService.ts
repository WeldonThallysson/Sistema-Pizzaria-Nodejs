import prismaClient from "../../prisma";

interface IDeleteCategoryServices {
    category_id: string
}
class DeleteCategoryServices {
    async execute({category_id}: IDeleteCategoryServices){
        
        const deletedCategory = await prismaClient.category.delete({
             where: {
                id: category_id
             }
        }) 
      return deletedCategory
    }
}

export {DeleteCategoryServices}