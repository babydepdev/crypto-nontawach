import { NextFunction, Request, Response } from "express";
import {
  createUserService,
  getUserByEmailService,
} from "../services/user.service";
import { CatchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import bcrypt from "bcryptjs";

export const registerController = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const user = await getUserByEmailService(email);

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const result = await createUserService({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "User created successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  }
);
