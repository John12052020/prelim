const { Handler } = require("express");

function handlerWrapper(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = handlerWrapper;
