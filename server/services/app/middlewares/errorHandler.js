function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = "Internal Server Error";
  const { name } = err;

  if (name === "SequelizeValidationError") {
    code = 400;
    msg = err.errors.map((error) => error.message);
  } else if (name === "Product Not Found" || name === "Category Not Found") {
    code = 404;
    msg = name;
  }

  res.status(code).json({
    statusCode: code,
    message: msg,
  });
}

module.exports = errorHandler;
