import prismaClient from "../../prisma"
import { hash } from "bcryptjs"

interface UserRequest{
   
    name: string,
    email: string,
    password: string

}

class CreateUserService {
    async execute({name,email,password}: UserRequest){
        //verifica se ele enviou um email
         if(!email){
            throw new Error("Email não foi enviado, envie um email !")
         }

         const UserExists = await prismaClient.user.findFirst({
            where:{
                email: email,
            }
         })

         if(UserExists){
            throw new Error("Email já existe")
         } 

          const passwordHash = await hash(password, 8) //cripytografia de senha !
      
          const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },

            select: {
                id: true,
                name: true,
                email: true
            }
         })
        return user
    }
}

export {CreateUserService}