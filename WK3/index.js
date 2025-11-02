// Import necessary core Node.js modules
const http = require("node:http");
const fs = require("node:fs");

// Configuration
const PORT = 3000;
const LOG_FILE = "requests.txt";

// --- Logging Function ---

/**
 * Logs the incoming request details (method, URL, timestamp)
 * to the specified log file asynchronously.
 * @param {http.IncomingMessage} req - The request object.
 */
function logRequest(req) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] Method: ${req.method}, URL: ${req.url}\n`;

  // Use fs.appendFile for non-blocking file writing.
  // This ensures the server can continue handling new requests immediately.
  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}

// --- Request Handler ---

/**
 * The main function that handles all incoming HTTP requests.
 * @param {http.IncomingMessage} req - The request object.
 * @param {http.ServerResponse} res - The response object.
 */
const serverHandler = (req, res) => {
  // 1. Log the request immediately before routing
  logRequest(req);

  // Clean up the URL to get the path (ignoring query parameters for simple routing)
  const path = req.url.split("?")[0];

  // 2. Handle routing logic
  switch (path) {
    case "/":
      // Homepage route
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to My Node Server");
      break;

    case "/about":
      // About route
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(
        "About Us: This server was built using Node.js standard modules (http and fs) to demonstrate basic asynchronous routing and file logging."
      );
      break;

    default:
      // 404 Not Found route
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Page Not Found");
      break;
  }
};

// 3. Create the server instance
const server = http.createServer(serverHandler);

// 4. Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
  console.log(`All requests will be logged to the file: ${LOG_FILE}`);
});
