import dotenv from "dotenv";

export class Config {
  protected dotenv = dotenv;
  constructor() {
    this.dotenv.config();
  }
  init = () => {
    const config = {
      app: {
        port: process.env.APP_PORT || 8000,
        env: process.env.NODE_ENV || "dev",
        version: process.env.VERSION || "v1",
      },
      db: {
        url: process.env.DB_MONGODB_URL || "mongodb://",
        host: process.env.DB_MONGODB_HOST || "localhost",
        port: process.env.DB_MONGODB_PORT || 27017,
        name: process.env.DB_MONGODB_NAME || "",
      },
    };
    return config;
  };
}
