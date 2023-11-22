import { Request,Response,NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction)
    {

        console.log("executou o middleware")
       
        //Receber o token

        const authToken = req.headers.authorization;
        // verificação de quando não vier o token não autorizar de forma alguma
        if(!authToken){
            return res.status(401).end();
        }
        // Recebe apenas o token sem o prefix
        const [, token] = authToken.split(" ")
        
        try{
        // Validar token

        const {sub} = verify( // esse (sub) é o id do usuario que ta logando que vem no token
            token,
            process.env.JWT_SECRET    
            ) as Payload; // ele precisa do token,da chave secreta do banco e se quiser as options e aproveita e tipa com o payload
         
            req.user_id = sub;
            console.log(sub)
         
        }catch(err){
            // se der errado não vai autorizar 
            res.status(401).end();

        }

        return next()
    }