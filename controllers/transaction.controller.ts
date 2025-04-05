import { NextFunction, Request, Response } from "express";
import { createTransactionService } from "../services/transaction.service";
import { CatchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import prisma from "../prisma/prisma";
import { createWalletAssetService } from "../services/wallet.service";
import { readAssetUserService } from "../services/user.service";

export const depositCryptoController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { form_user_id, to_user_id, currency_id, order_id, type } =
        req.body;

      const user_form = await readAssetUserService({
        user_id: form_user_id,
        type,
        currency_id,
      });

      const user_to = await readAssetUserService({
        user_id: to_user_id,
        type,
        currency_id,
      });

      const order = await prisma.orders.findFirst({
        where: {
          id: order_id,
          status: "pending",
          type: "sell",
        },
      });

      if (!order) {
        return next(new ErrorHandler("Order not found", 400));
      }

      if (!user_form?.WalletsAccount[0]?.WalletsAsset[0]) {
        await createWalletAssetService({
          walletAccount_id: String(user_form?.WalletsAccount[0]?.id),
          currency_id: currency_id,
          balance: 0,
          locked: 0,
        });
      }
      if (!user_to?.WalletsAccount[0]?.WalletsAsset[0]) {
        await createWalletAssetService({
          walletAccount_id: String(user_to?.WalletsAccount[0]?.id),
          currency_id: currency_id,
          balance: 0,
          locked: 0,
        });
      }

      await prisma.walletsAsset.update({
        where: {
          walletAccount_id: String(user_form?.WalletsAccount[0]?.id),
          currency_id: currency_id,
        },
        data: {
          balance: user_form?.WalletsAccount[0]?.WalletsAsset[0]?.balance.minus(
            order.amount
          ),
        },
      });
      await prisma.walletsAsset.update({
        where: {
          walletAccount_id: String(user_to?.WalletsAccount[0]?.id),
          currency_id: currency_id,
        },
        data: {
          balance: user_to?.WalletsAccount[0]?.WalletsAsset[0]?.balance.plus(
            order.amount
          ),
        },
      });

      await prisma.orders.update({
        where: {
          id: order_id,
        },
        data: {
          status: "completed",
        },
      });

      await createTransactionService({
        form_user_id,
        to_user_id,
        currency_id,
        amount: Number(order.amount),
        price: Number(order.price),
        type: "deposit",
        order_id,
      });

      res.status(201).json({
        message: "Transaction created successfully",
        user_form,
        user_to,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);

export const withdrawCryptoController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, wallet_address, currency_id, type, amount } = req.body;
      const user = await readAssetUserService({
        user_id,
        type,
        currency_id,
      });

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      await prisma.walletsAsset.update({
        where: {
          walletAccount_id: String(user?.WalletsAccount[0]?.id),
          currency_id: currency_id,
        },
        data: {
          balance:
            user?.WalletsAccount[0]?.WalletsAsset[0]?.balance.minus(amount),
        },
      });
      await prisma.withDrawals.create({
        data: {
          user_id: user_id,
          currency_id: currency_id,
          wallet_account_id: String(user?.WalletsAccount[0]?.id),
          amount: amount,
          wallet_address: wallet_address,
          status: "completed",
        },
      });

      res.status(201).json({
        message: "Transaction created successfully",
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);
