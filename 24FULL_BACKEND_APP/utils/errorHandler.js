
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const extraDetails = err.extraDetails || null;

    res.status(status).json({
        success: false,
        message,
        ...(extraDetails && { extraDetails }),
    });
};

module.exports = errorHandler;
