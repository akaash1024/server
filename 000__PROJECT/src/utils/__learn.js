// Basic asyncHandler function
const asyncHandler = (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next);  // Await the asynchronous function
    } catch (error) {
      next(error);  // Pass the error to the next handler (usually an error handler)
    }
  };
  
  // Example usage
  const myAsyncFunction = asyncHandler(async (req, res, next) => {
    // Simulating an async operation with a promise
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => resolve("Data fetched!"), 1000);
    });
  
    res.send(result);  // Send the result as a response
  });
  