#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app.js";
import debug from "debug";
import http from "http";

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || "3333");

/**
 * Create HTTP server.
 */

function newServer() {
  app.set("port", port);
  const server = http.createServer(app);
  server.listen(port);
  server.on("error", onError);
  server.on("listening", () => onListening(server));
}

newServer();

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      // port already in use
      console.error(bind + " is already in use");
      if (port > normalizePort(process.env.PORT) + 10) {
        // limit trying different ports to 10 tries
        process.exit(1);
      } else {
        // try a different port
        port = normalizePort(port) + 1;
        newServer();
        break;
      }
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server) {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log("Listening on port " + port);
}
