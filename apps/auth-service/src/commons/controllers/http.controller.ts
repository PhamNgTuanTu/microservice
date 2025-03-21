import { Response } from "express";
import colors from "colors/safe";
import IParams from "../interfaces/params";

export default class HttpController {
  sendResponse(res: Response, next: Function, data: object, params?: IParams) {
    let { message = "", status = 200 } = params || {};

    res.status(status).json({ message, data });

    if (status >= 400) console.log(colors.red(message));
    if (next) next();
  }
}
