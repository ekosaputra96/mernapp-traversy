const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

const jwtSignAsync = util.promisify(jwt.sign);
const jwtVerifyAsync = util.promisify(jwt.verify);

// generating hash password
async function generateHashedPassword(password) {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    return await bcrypt.hash(password, salt);
}

// generating token
async function generateToken(id){
    return await jwtSignAsync({id}, process.env.JWT_SECRET, {
        expiresIn: '6h'
    })
}

// compare password
async function comparePassword(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword);
}

// decoding token
async function decodeToken(token){
    return await jwtVerifyAsync(token, process.env.JWT_SECRET);
}

module.exports = {
    generateHashedPassword,
    generateToken,
    comparePassword,
    decodeToken
};
