const User = require("../models/userModel");
const { successWrapper } = require("../utils/responseWrapper");
const { ValidationError } = require("../utils/CustomError");
const {
    generateHashedPassword,
    generateToken,
    comparePassword,
} = require("../utils/userHelper");

/*
    @desc   create a new user
    @route  POST /api/v1/users
    @access Public
*/
async function register(req, res, next) {
    const { name, email, password, age = null, address = null } = req.body;

    // checking all required fields
    if (!name || !email || !password)
        return next(new ValidationError("Missing credentials"));
    if (password.length < 6)
        return next(
            new ValidationError("Password must be at least 6 characters long")
        );

    try {
        // checking if user already exists
        const isUserExists = !!(await User.exists({ email }));
        if (isUserExists) {
            throw new ValidationError("User already exists");
        }

        // creating user
        const user = await User.create({
            name,
            email,
            password: await generateHashedPassword(password),
            age,
            address,
        });

        return successWrapper(
            res,
            {
                email: user.email,
                token: await generateToken(user._id),
            },
            "User created successfully",
            201
        );
    } catch (error) {
        next(error);
    }
}

/*
    @desc   login user
    @route  POST /api/v1/users/login
    @access Public
*/
async function login(req, res, next) {
    const { email, password } = req.body;

    // checking all required fields
    if (!email || !password)
        return next(new ValidationError("Missing credentials"));

    try {
        // checking if user exists
        const foundUser = await User.findOne({ email });
        if (
            !foundUser ||
            !(await comparePassword(password, foundUser.password))
        ) {
            throw new ValidationError("Invalid credentials");
        }

        return successWrapper(
            res,
            {
                email: foundUser.email,
                token: await generateToken(foundUser._id),
            },
            "User login successfull"
        );
    } catch (error) {
        next(error);
    }
}

/*
    @desc   get current logged in user
    @route  GET /api/v1/users/me
    @access Private
*/
async function getMe(req, res) {
    return successWrapper(res, req.user, "Get current user");
}

module.exports = {
    register,
    login,
    getMe,
};
