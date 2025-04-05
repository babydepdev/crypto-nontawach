import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import prisma from "../prisma/prisma";

export const oneToOneRelationController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await prisma.users.findUnique({
        where: {
          id: id,
        },
        include: {
          BankAccount: true,
        },
      });
      if (!result) {
        return next(new ErrorHandler("User not found", 404));
      }
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

export const oneToManyRelationController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await prisma.users.findUnique({
        where: {
          id: id,
        },
      });
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      const result = await prisma.orders.findMany({
        where: {
          user_id: id,
        },
      });
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

export const manyToManyRelationController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await prisma.users.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const result = await prisma.favouriteCurrency.findMany({
        where: {
          user_id: id,
        },
        include: {
          User: true,
          Currency: true,
        },
      });
      res.status(200).json({
        message: "FavouriteCurrency retrieved successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);
