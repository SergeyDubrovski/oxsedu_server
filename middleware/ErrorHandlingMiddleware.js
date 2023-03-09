const ApiError = require("../error/AppError")
// middleware обработчик событий
const errorHandlingMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {              // если тип ошибки соответствует заданному классу
        res.status(err.status).json({message: err.message})
    }
    res.status(500).json({message : 'unexpected error'})
}
module.exports = errorHandlingMiddleware

