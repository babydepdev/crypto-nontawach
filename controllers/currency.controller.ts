import { NextFunction, Request, Response } from "express";
import { createCurrencyService } from "../services/currency.service";
import { CatchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import prisma from "../prisma/prisma";

export const createCurrencyController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, abbreviation } = req.body;
      const currency = await prisma.currency.findFirst({
        where: {
          OR: [
            {
              name: name,
            },
            {
              abbreviation: abbreviation,
            },
          ],
        },
      });
      if (currency) {
        return next(new ErrorHandler("Currency already exists", 400));
      }
      const result = await createCurrencyService({
        name,
        abbreviation,
      });

      res.status(201).json({
        message: "Currency created successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);
