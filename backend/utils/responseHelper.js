const successResponse = (res, response = {}, message = "", status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    response,
  });
};

const errorResponse = (res, message = "Something went wrong", status = 500) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
