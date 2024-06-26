import { Request,Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";


class SendOrderController {
    async handle(req: Request,res: Response){
        
        const order_id = req.query.order_id as string;
        
        const Send = new SendOrderService()

        const order = await Send.execute({order_id});

        return res.json(order)
    }
}

export {SendOrderController}