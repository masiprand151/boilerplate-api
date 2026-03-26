const { ResponseError } = require("../libs/response.error");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: "Internal Server Error",
  });
};

module.exports = errorMiddleware;
