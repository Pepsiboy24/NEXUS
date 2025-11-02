const express = require("express");
const app = express();
const PORT = 3000;

// --- 1. Custom Middleware for Logging ---
// Middleware is a function executed between receiving the request and sending the response.
// This function runs for *every* request hitting the server.
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  // Log the request's URL and method
  console.log(`[${timestamp}] Request: ${req.method} ${req.url}`);

  // IMPORTANT: 'next()' must be called to pass control to the next middleware function
  // or the final route handler. Without it, the request stalls.
  next();
};

// Apply the logging middleware globally to all routes
app.use(requestLogger);

// --- 2. Static File Middleware ---
// Serve static files (HTML, CSS, JS, images) from the 'public' directory.
// When a request comes in (e.g., for '/index.html'), Express looks for it here.
app.use(express.static("public"));

// --- 3. Define Specific Routes ---

// A. Home Route (Root Path)
// Requesting '/' will automatically serve public/index.html due to the static middleware.
app.get("/", (req, res) => {
  console.log("Serving homepage (index.html)");
  // Note: The response is automatically handled by express.static()
});

// B. /about Route
app.get("/about", (req, res) => {
  res.status(200).send(`
        <h1>About Our Express Server</h1>
        <p>This page demonstrates basic Express routing and middleware. 
        It's a step up from the basic Node.js http module!</p>
        <p>Return to <a href="/">Home</a> or go to <a href="/contact">Contact</a>.</p>
    `);
});

// C. /contact Route
app.get("/contact", (req, res) => {
  res.status(200).send(`
        <h1>Contact Us</h1>
        <p>Reach out to us at: contact@express-demo.com</p>
        <p>Return to <a href="/">Home</a> or go to <a href="/about">About</a>.</p>
    `);
});

// --- 4. Custom 404 Handler (MUST be the last route) ---
// If the request hasn't been handled by any of the routes or static files above,
// it falls through to this middleware.
app.use((req, res, next) => {
  // Set the status code to 404 (Not Found)
  res.status(404);

  // Express serves the public/404.html file with the 404 status code
  res.sendFile(__dirname + "/public/404.html");
});

// --- 5. Start the Server ---
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log(`Static files are served from the 'public/' directory.`);
});

