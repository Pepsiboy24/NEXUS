const http = require("node:http");
const chalk = require("chalk");

const PORT = 3000;

// === VARIABLE TO TEST AUTO-RESTART ===
let COUNTER = 1;
// ======================================

const server = http.createServer((req, res) => {
  // Increment and use the counter
  COUNTER++;

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(
    `Request Count: ${COUNTER}\nVisit http://localhost:${PORT}/ in your browser.`
  );
});

server.listen(PORT, () => {
  // Using chalk to colorize the console output
  console.log(chalk.black.bgGreen.bold(`\n\n--- SERVER RESTARTED ---`));
  console.log(chalk.cyan(`Server is running at http://localhost:${PORT}/`));
  console.log(chalk.yellow(`Current Counter Value on Startup: ${COUNTER}`));
  console.log(chalk.gray(`\n* Nodemon is watching for changes... *`));
});
