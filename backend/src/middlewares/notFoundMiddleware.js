const { notFoundWrapper } = require("../utils/responseWrapper");

function notFoundHandler(req, res, next){
    // json response
    if(req.get("Accept").split(',')[0].toLowerCase() === "application/json"){
        return notFoundWrapper(res);
    }

    // html response
    next();
}

module.exports = notFoundHandler;