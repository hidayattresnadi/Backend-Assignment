function errorHandler(err, req, res, next) {
    let status = 500
    let msg = 'Internal Server Error'
    switch (err.name) {
        case "SequelizeValidationError":
            status = 400
            msg =  err.errors[0].message
            break;
        case 'Unauthorized':
            status = 401
            msg = 'You have to login first'
            break;
        case 'JsonWebTokenError':
            status = 401
            msg = 'You have to login first'
            break;
        case 'invalidCredentials':
            status = 401
            msg = 'error invalid username or password'
            break;
        case 'Please fill requirement data':
            status = 401
            msg = 'error invalid username or password'
            break;
        case 'error not found':
            status = 404
            msg = 'error not found'
            break;
        case "SequelizeUniqueConstraintError":
            status = 409
            msg =err.errors[0].message
            break;
        default:
            break;
    }
    res.status(status).json({ message: msg })
}
module.exports = { errorHandler }