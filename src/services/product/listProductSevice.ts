

import prismaClient from "../../prisma";

interface CatergoryIdType {
    category_id: string
}

class ListProductService{
    async execute({category_id}: CatergoryIdType){
 
        const listProduct = await prismaClient.product.findMany({
            where: {
               category_id: category_id
            }
        })

        return listProduct

    }
}

export {ListProductService}