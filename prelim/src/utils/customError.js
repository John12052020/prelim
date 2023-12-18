class CustomError extends Error {
    constructor(status, message) {
        super();
        this.status = status;

        if (this.status >= 500) {
            this.message = "Internal Server Error";
        } else {
            this.message = String(message);
        }
    }
}

module.exports = CustomError;
