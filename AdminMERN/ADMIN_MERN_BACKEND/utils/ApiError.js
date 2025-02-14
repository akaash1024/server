// const ApiError = (err, req, res, next) => {
//   const status = err.status || 500;
//   const message = err.message || "Backend Error ";
//   const extraDetails = err.extraDetails || "Error form BackendP";

//   return res.status(status).json({ message, extraDetails });
// };

// module.exports = { ApiError };

const ApiError = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Backend Error";
  const extraDetails = err.extraDetails || "Error from backedn";

  return res.status(status).json({ message, extraDetails });
};

module.exports = { ApiError };
