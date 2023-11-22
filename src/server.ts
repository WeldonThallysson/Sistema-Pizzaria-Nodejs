import express,{NextFunction, Request,Response} from 'express'
import { router } from './routes'
import "express-async-errors"
import path from 'path'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

//cria uma rota estatica para buscar a foto e enviar para o front end o que está aqui na api 
app.use("/files",
express.static(path.resolve(__dirname,"..","tmp")))

app.use((err: Error,req: Request,res: Response,next: NextFunction) => {
      if(err instanceof Error){
         return res.status(400).json({
            error: err.message
       })
      }

      return res.status(500).json({
         status: "error",
         message: "Internal server error"
      })
})

 
app.listen(3333,() => {
   console.log("Servidor online")
})