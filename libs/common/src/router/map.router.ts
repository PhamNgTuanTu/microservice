import fs from 'fs';
import path from 'path';
import { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Initializes the router by adding routes to the provided Express application.
 *
 * @param app The Express application to add routes to.
 * @returns void
 */
export default class Router {
  constructor(private modulePath: string) {}

  initialize(app: Application): void {
    const isDirectory = (source: string) => fs.lstatSync(source).isDirectory();
    const getDirectories = (source: string) =>
      fs.readdirSync(source).filter((name: string) => isDirectory(path.join(source, name)));

    getDirectories(this.modulePath).forEach((route) => {
      app.use(
        `/api/${process.env.VERSION || ''}/${route.replace(/-/g, '')}`,
        require(path.join(this.modulePath, route)).default,
      );
    });
  }
}
