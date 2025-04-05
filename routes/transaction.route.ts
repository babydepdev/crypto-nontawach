import express from "express";
import { depositCryptoController } from "../controllers/transaction.controller";
const transactionRouter = express.Router();

transactionRouter.post("/deposit/crypto", depositCryptoController);

export default transactionRouter;
