import express from "express";
import { depositCryptoController, withdrawCryptoController } from "../controllers/transaction.controller";
const transactionRouter = express.Router();

transactionRouter.post("/deposit/crypto", depositCryptoController);
transactionRouter.post("/withdraw/crypto", withdrawCryptoController);

export default transactionRouter;
