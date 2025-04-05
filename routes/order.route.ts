import express from "express";
import {
  cancelOrderController,
  createOrderBuyController,
  createOrderSellController,
  readOrdersBuyController,
  readOrdersSellController,
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/order/buy", createOrderBuyController);
orderRouter.post("/order/sell", createOrderSellController);
orderRouter.get("/orders/:id/buy", readOrdersBuyController);
orderRouter.get("/orders/:id/sell", readOrdersSellController);
orderRouter.patch("/order/:id", cancelOrderController);

export default orderRouter;
