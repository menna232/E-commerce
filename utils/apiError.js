// class [reusable component ] for handling errors from api's
class apiError extends Error{
    constructor(errorMsg, statusCode){
        super(errorMsg)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true
        // Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = apiError