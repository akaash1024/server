const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend Error";
    const extraDetails = err.extraDetails || err.stack || "Something went wrong";
    const success = false;

    console.error("🔥 Error caught by errorHandler:");
    console.error("Status:", status);
    console.error("Message:", message);
    console.error("Details:", extraDetails);

    res.status(status).json({ success, status, message, extraDetails });
};

module.exports = errorHandler;
