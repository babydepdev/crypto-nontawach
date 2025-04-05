import prisma from "../prisma/prisma";
import {
  createOrderService,
  listAllOrderTypeService,
} from "../services/order.service";
import { CatchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";

export const createOrderController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, currency_id, type, amount, fiat_id, price } = req.body;

      const result = await createOrderService({
        user_id,
        currency_id,
        fiat_id,
        type,
        amount,
        price,
        status: "pending",
      });

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

export const listAllOrdersBuyController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.body;
      const result = await listAllOrderTypeService(user_id, "buy");

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

export const listAllOrdersSellController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.body;
      const result = await listAllOrderTypeService(user_id, "sell");

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
