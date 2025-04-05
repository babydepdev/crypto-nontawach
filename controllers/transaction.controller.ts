import { NextFunction, Request, Response } from "express";
import { createTransactionService } from "../services/transaction.service";
import { CatchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import prisma from "../prisma/prisma";

export const depositCryptoController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { form_user_id, to_user_id, currency_id, amount, price, type } =
        req.body;

      if (
        !form_user_id ||
        !to_user_id ||
        !currency_id ||
        !amount ||
        !price ||
        !type
      ) {
        return next(new ErrorHandler("Missing required fields", 400));
      }

      const walletForm = await prisma.wallets.findFirst({
        where: {
          user_id: form_user_id,
          currency_id,
        },
      });
      const walletTo = await prisma.wallets.findFirst({
        where: {
          user_id: to_user_id,
          currency_id,
        },
      });

      if (type === "deposit") {
        if (walletForm === null || walletTo === null) {
          return next(new ErrorHandler("Insufficient balance", 400));
        }
        if (walletForm.balance < amount || walletTo.balance < amount) {
          return next(new ErrorHandler("Insufficient balance", 400));
        }

        if (walletForm.user_id === walletTo.user_id) {
          return next(new ErrorHandler("Invalid transaction", 400));
        }

        await prisma.wallets.update({
          where: {
            user_id_currency_id: {
              user_id: form_user_id,
              currency_id: currency_id,
            },
          },
          data: {
            balance: walletForm.balance.minus(amount),
          },
        });
        await prisma.wallets.update({
          where: {
            user_id_currency_id: {
              user_id: to_user_id,
              currency_id: currency_id,
            },
          },
          data: {
            balance: walletTo.balance.plus(amount),
          },
        });
      }

      const result = await createTransactionService({
        form_user_id,
        to_user_id,
        currency_id,
        amount,
        price,
        type: "deposit",
      });

      res.status(201).json({
        message: "Transaction created successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);
