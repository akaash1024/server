const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "BACKEND ERROR";
  const extraDetails = err.extraDetails || "Error from Backend";

  return res.status(status).json({ status, message, extraDetails });
};

module.exports = errorMiddleware;
