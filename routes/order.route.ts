import express from "express";
import {
  cancelOrderController,
  createOrderController,
  listAllOrdersBuyController,
  listAllOrdersSellController,
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/order", createOrderController);
orderRouter.get("/orders/buy", listAllOrdersBuyController);
orderRouter.get("/orders/sell", listAllOrdersSellController);
orderRouter.patch("/order/:id", cancelOrderController);

export default orderRouter;
