import prismaClient from "../../prisma";
interface CategoryRequest{
    name: string;
}
class CreateCategoryService{
    async execute({name}: CategoryRequest){

        if(name == ""){
            throw new Error("nome invalido")
        }
        
        const categoryAlredyExists = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })

        if(categoryAlredyExists){
             throw new Error("Essa categoria já existe !")
        }
        
        const catergory = await prismaClient.category.create({
            data:{
                name: name,
            },
            select:{ 
                id: true,
                name: true
            }
        })

        return catergory
    }
}


export { CreateCategoryService }