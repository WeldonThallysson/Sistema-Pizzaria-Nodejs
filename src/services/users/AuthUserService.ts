import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface AuthRequest {
    email: string,
    password: string,
}

class AuthUserService{
    async execute({email,password}: AuthRequest){
        console.log(email)

        // verificar se o email existe

        const user = await prismaClient.user.findFirst({
            where:{
                email
            }
        })
 
        if(!user){
            throw new Error("Email já existe")
        }

        //verificar se a senha que mandou está correta verificamos usando o compare pegando a senha do findEmail

        const passwordMatch = await compare(password,user.password)

        if(!passwordMatch){
          throw new Error("sua senha está incorreta")      
        }   

        // se deu tudo certo agora vamos gerar um token para o usuario

        const token = sign(
            {
                name: user.name,
                email: user.email,
          
            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn: "30d"
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export {AuthUserService}