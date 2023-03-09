const ApiError = require("../error/AppError");

class userController {
    async registration(req, res) {

    }
    async login(req, res) {

    }
    async checkAuth(req, res) {
        const {id} = req.query;
        if(!id) {
            return res.send(ApiError.forbidden('Не найден id'))
        }
    }
}

module.exports = new userController();