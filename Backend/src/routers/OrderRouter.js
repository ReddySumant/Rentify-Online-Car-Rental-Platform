import { Router } from 'express'
import { addOrderData, deleteOrderData, getOrderData } from '../controller/OrderController.js';

const OrderRouter = Router();

OrderRouter.post("/data/add", addOrderData);
OrderRouter.get("/data/get", getOrderData);
OrderRouter.delete("/data/delete", deleteOrderData);

export default OrderRouter;