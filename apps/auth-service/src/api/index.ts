import fs from "fs";
import path from "path";
import { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

const VERSION = process.env || "";
/**
 * Initializes the router by adding routes to the provided Express application.
 * 
 * @param app The Express application to add routes to.
 * @returns void
 */
export default class Router {
  initialize(app: Application): void {
    const isDirectory = (source: string) => fs.lstatSync(source).isDirectory();

    const getDirectories = (source: string) =>
      fs
        .readdirSync(source)
        .filter((name: string) => isDirectory(path.join(source, name)));

    getDirectories(path.join(__dirname, "modules")).forEach((route) =>
      app.use(
        `/api/${VERSION}/${route.replace(/-/g, "")}`,
        require(`./modules/${route}`).default
      )
    );
  }
}
