import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string,
    password: string,
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        console.log(email);
        try {
            // verificar se o email existe
            const user = await prismaClient.user.findFirst({
                where: {
                    email
                }
            });

            if (!user) {
                throw new Error("Email não existe");
            }

            //verificar se a senha que mandou está correta verificamos usando o compare pegando a senha do findEmail
            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new Error("Sua senha está incorreta");
            }

            // se deu tudo certo agora vamos gerar um token para o usuario
            const token = sign(
                {
                    name: user.name,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    subject: user.id,
                    expiresIn: "30d"
                }
            );

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        } catch (error) {
            // Aqui você pode lidar com o erro, por exemplo, lançando-o novamente ou tratando-o de outra maneira
            throw new Error(`Erro ao autenticar usuário: ${error.message}`);
        }
    }
}

export { AuthUserService };