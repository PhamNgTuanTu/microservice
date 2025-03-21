import Router from "@app/common/router/map.router";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
// import { Database } from "../databases";

class App {
  express: Application;
  private router = new Router(path.join(__dirname, "../api/modules"));
  // private database = new Database()

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    // this.database.connect()
  }

  private middlewares(): void {
    // Use helmet early in the middleware stack
    this.express.use(helmet({ contentSecurityPolicy: false }));
    // Use compression before other body parsers
    this.express.use(compression());
    // Enable CORS
    this.express.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "HEAD"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        credentials: true,
      })
    );
    // Use body parsers
    this.express.use(bodyParser.json({ limit: "1mb" }));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    // Use cookie parser
    this.express.use(cookieParser());
    // Serve static files
    this.express.use(express.static("."));
    // Enable logging only in development environment
    if (process.env.NODE_ENV === "dev") {
      this.express.use(morgan("dev"));
    }
  }

  private routes(): void {
    this.router.initialize(this.express);
  }
}

export default new App().express;
