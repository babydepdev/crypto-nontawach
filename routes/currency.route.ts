import express from "express";
import { createCurrencyController } from "../controllers/currency.controller";
const currencyRouter = express.Router();

currencyRouter.post("/currency", createCurrencyController);

export default currencyRouter;
