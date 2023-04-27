const { ValidationError } = require("../utils/CustomError");
const { errorWrapper } = require("../utils/responseWrapper");

function errorHandler(err, req, res, next) {
    // json response
    if (req.get("Accept").split(",")[0].toLowerCase() === "application/json") {
        // default error
        return errorWrapper(res, err);
    }

    // html response
    if (process.env.NODE_ENV === "production") {
        return next();
    }

    return next(err);
}

module.exports = errorHandler;
