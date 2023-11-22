import prismaClient from "../../prisma";


// essa rota eu estou criando por mim mesmo
class ListOrdersService {
    async execute(){
        const orders = await prismaClient.order.findMany({
            where: {
                draft: false,
                status: false,
            },
            orderBy: {
                created_At: "desc" // dessa forma ele ordena pelos que foram criados recentemente de forma decrescente
            },
        
           
        })

       return orders;


    }
}

export { ListOrdersService }