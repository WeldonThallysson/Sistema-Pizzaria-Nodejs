import prismaClient from "../../prisma";

interface OrderRequest{
    table: number
    name?: string
}

class CreateOrderService {
  async execute({table,name}: OrderRequest){

    const orders = await prismaClient.order.create({
        data: {
            table: table,
            name: name
        }
    })

    if(!orders){
        return console.log("Error no cadastro dos pedidos !")
    }
    else{
        return orders;
    }
    
  }
}

export {CreateOrderService}