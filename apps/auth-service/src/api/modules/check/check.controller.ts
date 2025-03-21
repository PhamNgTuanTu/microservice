import HttpController from "@app/common/controllers/http.controller";
import { Request, Response, NextFunction } from "express";
// import HttpController from "../../../commons/controllers/http.controller";

class CheckController extends HttpController {
  checkHealth = async (req: Request, res: Response, next: NextFunction) => {
    const message = { message: "Success", status: "API is running..." };
    return this.sendResponse(res, next, message);
  };
}

export default new CheckController();
