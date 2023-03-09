const ApiError = require("../error/ApiError")
// middleware обработчик событий
const errorHandlingMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {              // если тип ошибки соответствует заданному классу
       return res.status(err.status).json({message: err.message})
    }
    res.status(500).json({message : 'unexpected error'})
}
module.exports = errorHandlingMiddleware

