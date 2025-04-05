import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../utils/catchAsyncError";
import { Request, Response, NextFunction } from "express";
import { createWalletService } from "../services/wallet.service";

export const paymentController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, currency_id, amount } = req.body;

      if (!user_id || !currency_id || !amount) {
        return next(new ErrorHandler("Missing required fields", 400));
      }

      const result = await createWalletService({
        user_id,
        currency_id,
        balance: amount,
      });

      res.status(201).json({
        message: "Wallet deposited successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);
