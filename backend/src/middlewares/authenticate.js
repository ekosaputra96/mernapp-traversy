const { AuthenticationError } = require("../utils/CustomError");
const { decodeToken } = require("../utils/userHelper");
const User = require("../models/userModel");

async function authenticate(req, res, next) {
    // check the token
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
    ) {
        return next(new AuthenticationError("No Token", 401));
    }

    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = await decodeToken(token);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) throw new AuthenticationError("Not authorized", 401);

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = authenticate;
