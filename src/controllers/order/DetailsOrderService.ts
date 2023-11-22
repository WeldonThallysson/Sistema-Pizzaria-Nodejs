import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailsOrderService";

class DetailOrderController {
    async handle(req:Request, res: Response){
        const {order_id} = req.body;

        const DetailOrder = new DetailOrderService();

        const order = await DetailOrder.execute({order_id});

        return res.json(order)


    }
}


export {DetailOrderController}