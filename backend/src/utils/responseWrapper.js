function successWrapper(res, data, message, statusCode = 200){
    return res.status(statusCode).json({
        success: true,
        data,
        message,
        code: statusCode,
    })
}

function errorWrapper(res, error, message = null) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message: message || error.message,
        type: error.name,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        code: error.code || statusCode,
    })
}

function notFoundWrapper(res){
    return res.status(404).json({
        success: false,
        message: 'Not Found',
        code: 404,
    })
}

module.exports = {
    successWrapper,
    errorWrapper,
    notFoundWrapper
}