class CustomResponse {
    constructor(statusCode = 200, message, data) {
        this.statusCode = statusCode;
        this.message = message !== undefined ? message : "ok";
        this.data = data;
    }
}

module.exports = { CustomResponse };
