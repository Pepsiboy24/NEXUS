function fetchDataWithDelay(delayInSeconds) {
  const delayMilliseconds = delayInSeconds * 1000;

  // A Promise represents a value that might be available now, or in the future,
  // or never. It takes a function with two arguments: resolve and reject.
  return new Promise((resolve, reject) => {
    console.log(
      `[STATUS] Simulating data fetching... will take ${delayInSeconds} seconds.`
    );

    // Simulate an asynchronous operation (like an HTTP request) using setTimeout
    setTimeout(() => {
      // Check if the delay is 0 seconds to simulate an instant failure (for demonstration)
      if (delayInSeconds === 0) {
        reject(new Error("Simulated API failure: Delay cannot be zero."));
        return;
      }

      // If successful, call resolve() and pass the data
      const data = {
        id: 101,
        content: "This is the asynchronously fetched data from the server.",
      };

      resolve(data);
    }, delayMilliseconds);
  });
}

// 2. Execute the asynchronous function and handle the result using .then() and .catch()
console.log("[START] Application execution started.");

// We call the function and specify what to do when the Promise is fulfilled (.then)
// and what to do if it fails (.catch)
fetchDataWithDelay(3)
  .then((data) => {
    // This is the callback that runs AFTER the 3-second delay
    console.log("\n[SUCCESS] Data received after delay:");
    console.log(data);
  })
  .catch((error) => {
    // This is the callback that runs if reject() is called
    console.error("\n[ERROR] Failed to fetch data:");
    console.error(error.message);
  })
  .finally(() => {
    // This runs regardless of success or failure
    console.log("\n[END OF FETCH] Promise handling complete.");
  });

// 3. Demonstrate Non-Blocking Behavior
// This message will appear *before* the "Data received" message, proving that Node.js
// did not block the main thread while waiting for the 3-second delay in the Promise.
console.log(
  "[NON-BLOCKING] This line executes immediately while the 3-second delay is running in the background."
);
