const ApiError = require("../error/AppError")

const errorHandlingMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({message: err.message})
    }
    res.status(500).json({message : 'unexpected error'})
}
module.exports = errorHandlingMiddleware

