import prisma from "../prisma/prisma";
import {
  createOrderService,
  readOrderTypeService,
} from "../services/order.service";
import { CatchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";

export const createOrderBuyController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, currency_id, amount, fiat_id, price } = req.body;

      if (!amount || !price || !fiat_id || !currency_id || !user_id) {
        return next(new ErrorHandler("Order not created", 400));
      }

      const result = await createOrderService({
        user_id,
        currency_id,
        fiat_id,
        type: "buy",
        amount,
        price,
        status: "pending",
      });

      if (!result) {
        return next(new ErrorHandler("Order not created", 400));
      }

      res.status(201).json({
        message: "Order created successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);

export const createOrderSellController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, currency_id, amount, fiat_id, price } = req.body;

      if (!amount || !price || !fiat_id || !currency_id || !user_id) {
        return next(new ErrorHandler("Order not created", 400));
      }

      const result = await createOrderService({
        user_id,
        currency_id,
        fiat_id,
        type: "sell",
        amount,
        price,
        status: "pending",
      });

      if (!result) {
        return next(new ErrorHandler("Order not created", 400));
      }

      res.status(201).json({
        message: "Order created successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);

export const readOrdersBuyController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new ErrorHandler("Order not created", 400));
      }

      const result = await readOrderTypeService(id, "buy");

      res.status(200).json({
        message: "Orders retrieved successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);

export const readOrdersSellController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await readOrderTypeService(id, "sell");

      res.status(200).json({
        message: "Orders retrieved successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);

export const cancelOrderController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await prisma.orders.update({
        where: {
          id: id,
        },
        data: {
          status: "cancelled",
        },
      });

      res.status(200).json({
        message: "Order cancelled successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);
