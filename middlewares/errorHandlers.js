function errorHandler(err, req, res, next) {
    let errors = []
    let statusCode = 500

    if(err.name === 'SequelizeValidationError') {
        statusCode = 400,
        err.errors.forEach(e => {
            errors.push(e.message)
        });
    } else if(err.name === 'LOGIN_FAILED') {
        statusCode = 400
        errors.push('invalid email or password')
    } else if(err.name === 'AUTHENTICATION_FAILED') {
        statusCode = 401
        errors.push('failed to authenticate!')  
    } else if(err.name === 'AUTHORIZATION_FAILED') {
        statusCode = 403
        errors.push('forbidden access')
    } else if(err.name === 'INVALID_TOKEN') {
        statusCode = 401
        errors.push('invalid token')
    } else if(err.name === 'DATA_NOT_FOUND') {
        statusCode = 404
        errors.push('data not found')
    } else if(err.name === 'TOTAL_CANT_LESS_THAN_ONE') {
        statusCode = 400
        errors.push('Total product at least one')
    } else if(err.name === 'CANT_ADD_MORE_THAN_STOCK') {
        statusCode = 400
        errors.push(`Can't add to cart more than product stock`)
    } else {
        errors.push(err.msg || 'Internal server error')
        statusCode = err.status || statusCode
    }

    res.status(statusCode).json({errors})
}

module.exports = errorHandler