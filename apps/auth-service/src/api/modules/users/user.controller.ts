import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import HttpController from "../../../commons/controllers/http.controller";
import { User } from "./user.model";

class UserController extends HttpController {
  private user = User;

  /**
   * Asynchronous function to list users.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   * @returns {Promise<void>} A Promise that resolves when the operation is completed.
   */
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.query.page || !req.query.limit) {
        throw new Error("Page and limit parameters are required.");
      }
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        throw new Error("Invalid page or limit values.");
      }
      const users = await this.user
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      this.sendResponse(res, next, users);
    } catch (error: any) {
      const errorResponse = {
        status: 500,
        message: `Error on list users | ${error.message}`,
      };

      this.sendResponse(res, next, {}, errorResponse);
    }
  };
}

export default new UserController();
