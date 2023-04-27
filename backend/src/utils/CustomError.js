// custom error classes
class ValidationError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

class AuthenticationError extends Error {
    constructor(message, statusCode = 401) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

module.exports = {
    ValidationError,
    AuthenticationError
}