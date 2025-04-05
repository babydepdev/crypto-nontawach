import express from "express";
import { paymentController } from "../controllers/wallet.controller";
const walletRouter = express.Router();

//เติมเงิน
walletRouter.post("/payment", paymentController);

export default walletRouter;
