import prismaClient from "../../prisma";

interface DetailsType {
    order_id: string
}

class DetailOrderService {
    async execute({order_id}: DetailsType){
        const orders = await prismaClient.item.findMany({
            where: {
                order_id: order_id,
            },
            include:{ 
//quando temos um relacionamento com outras tabelas como é o caso de product e order podemos nessa tabela que está recebendo os id´s delas duas acessar através do include os detalhes dos ids de ambas.
                product: true,
                order: true
            }
        })

        return orders
    }
}
export {DetailOrderService}