import prismaClient from "../../prisma";


interface DetailType {
    user_id: string;
}
// serviço que contem funcionalidade para recuperar os dados do usuario logado através do token.
class DetailUserService{
    async execute({user_id} : DetailType){

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select:{
                id: true,
                email: true,
                name: true,
            }
        })


        return user;

    }

}

export {DetailUserService}