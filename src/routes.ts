import { Router,Request,Response } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";
import { DetailUserController } from './controllers/users/DetailUserController'
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/createProductController";
import { ListProductController } from "./controllers/product/listProductController";
import { CreateOrderController } from "./controllers/order/createOrderController";
import { ListOrdersController } from './controllers/order/ListOrdersController'; 
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import {DeleteCategoryController} from './controllers/category/DeleteCategoryController'
import uploadConfig from './config/multer' 
import multer from "multer";

import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { DetailOrderController } from "./controllers/order/DetailsOrderService";
import { FinishOrderController } from "./controllers/order/FinishOrderService";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))
//rotas para o cadastro dos usuarios login e detalhes do usuario para sistema web (cozinha) e app (garçon)
router.post("/users", new CreateUserController().handle) //rota para criar um usuario tando na cozinha quando para o garçon
router.post("/session", new AuthUserController().handle) //rota para logar no sistema web ou app
router.get("/me", isAuthenticated, new DetailUserController().handle) // rota para buscar os detalhes da nova conta criada, email,nome, e senha.

//Rotas para cadastro de categorias e listagem de categorias cadastradas

router.post("/category", isAuthenticated, new CreateCategoryController().handle) //rota para cadastrar uma categoria nova através do sistema web.
router.get("/category", isAuthenticated, new ListCategoryController().handle) // rota para buscar uma categoria para o App(garçon).
router.delete("/category", isAuthenticated, new DeleteCategoryController().handle) // rota para deletar categoria
// Rotas para os produtos
router.post("/product", isAuthenticated,upload.single('file'), new CreateProductController().handle) //rota para cadastrar um novo produto através do sistema web(Cozinha ou admin).
router.get("/product/category", isAuthenticated, new ListProductController().handle) // rota para buscar os produtos pela categoria para o App(garçon).

//Rotas para os pedidos
router.post("/order", isAuthenticated, new CreateOrderController().handle) //Rota para cadastrar uma nova mesa com o nome do cliente App(Garçon).
router.get("/all",isAuthenticated, new ListOrdersController().handle) //ROTA PARA RECUPERAR TODAS AS MESAS QUE FORAM CADASTRADAS PELO App (Garçon).
router.post("/order/add", isAuthenticated, new AddItemController().handle) // Rota para adicionar o pedido com o id da mesa e o id do produto já filtrado pelo App(garçon).
router.delete("/order", isAuthenticated, new RemoveOrderController().handle ) // Rota para deletar a mesa em geral pelo App (Garçon).
router.delete("/order/remove", isAuthenticated,new RemoveItemController().handle)// Rota para deletar o pedido de um produto pelo App(Garçon) .
router.put("/order/send", isAuthenticated, new SendOrderController().handle) // Rota para enviar o pedido para o sistema Web(admin ou cozinha), onde ela altera o draft(rascunho) de true para false.
router.get("/order/details",isAuthenticated, new DetailOrderController().handle)
router.put("/order/finish", isAuthenticated, new FinishOrderController().handle)

export {router}