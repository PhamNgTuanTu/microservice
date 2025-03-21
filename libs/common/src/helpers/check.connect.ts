import mongoose from "mongoose";
import { setInterval } from "timers";
import os from "os";

export class CheckConnection {
  private _SECONDS = 5000;

  getConnectionCount = () => {
    const connectionCount = mongoose.connections.length;
    console.log(`Number of active connections: ${connectionCount}`);
  };

  checkOverLoad = () => {
    setInterval(() => {
      const connectionCount = mongoose.connections.length;
      const numCore = os.cpus().length;
      const memoUsage = process.memoryUsage().rss;

      const maxConnections = numCore * 5;

      console.log("Active connections: " + connectionCount);
      console.log("Memory usage: " + memoUsage / 1024 / 1024 + " MB");

      if (connectionCount > maxConnections) {
        console.log("Connection overload detected!");
      }
    }, this._SECONDS);
  };
}
