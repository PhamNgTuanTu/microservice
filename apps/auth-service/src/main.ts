import * as http from "http";
import colors from "colors/safe";
import App from "./server/app";
import { Config } from "./commons/config";

const PORT = new Config().init().app.port;
const VERSION = new Config().init().app.version;

export const server = http.createServer(App);

server.listen(PORT);
server.on("listening", () =>
  console.log(
    colors.yellow(
      `API has been started... click => http://localhost:${PORT}/api/${VERSION}/check/health`
    )
  )
);
server.on("error", (error: NodeJS.ErrnoException) =>
  console.log(error.message)
);
