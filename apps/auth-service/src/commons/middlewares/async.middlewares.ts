import { NextFunction, Request, Response } from "express";

export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((error: Error) => {
      res.status(400).json({ message: (error || {}).message, data: error });
      return next;
    });
