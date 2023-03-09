const ApiError = require("../error/ApiError");

class userController {
    async registration(req, res) {

    }
    async login(req, res) {

    }
    async checkAuth(req, res, next) {
        const {id} = req.query;
        if(!id) {
            return next(ApiError.forbidden('Не найден id'))
        }
        res.status(200).json(id)
    }
}

module.exports = new userController();