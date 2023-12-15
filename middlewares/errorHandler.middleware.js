const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  const message = err.message || "Server Error!";
  res.status(statusCode).json({ success: false, msg: message });
};

module.exports = { errorHandler };
