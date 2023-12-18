const CustomError = require("../utils/customError");
const { CustomResponse } = require("../utils/customResponse");

function errorHandler(error, req, res, _next) {
    const customError = error instanceof CustomError ? error : new CustomError();
    const customResponse = new CustomResponse();

    customResponse.statusCode = customError.status;
    customResponse.message = customError.message;

    res.status(customResponse.statusCode).json(customResponse);
}

module.exports = errorHandler;