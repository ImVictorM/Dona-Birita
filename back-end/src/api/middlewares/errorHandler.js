async function handleError(error, _req, res, _next) {
  const errorStack = Number(error.stack);
  const errorStackIsNotANumber = Number.isNaN(errorStack);
  const errorCode = errorStackIsNotANumber ? 520 : errorStack;
  return res.status(errorCode).json({ message: error.message });
}

module.exports = handleError;
