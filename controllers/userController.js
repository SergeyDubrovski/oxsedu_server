const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError");
const { User, Basket } = require('../models/models');
const { create } = require('./deviceController');

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role },
        process.env.SECRET_KEY, { expiresIn: '24h' });
} // прошивка токена параметрами
class userController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Не корректный password или email'))
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь уже существует'))
        }
        const hashpassword = await bcrypt.hash(password, 5); // хэширование пароля (пароль. степень хэширования)
        const user = await User.create({ email, password: hashpassword, role });
        await Basket.create({ userId: user.id });
        const token = generateJwt(user.id, user.email, user.role);
        return res.status(200).json({ token })
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        const comparepassword = bcrypt.compareSync(password, user.password); //сравнение пароля с хэш.паролем из базы
        if (!comparepassword) {
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.status(200).json({ token })
    }
    async checkAuth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        res.status(200).json(token)
    }
}

module.exports = new userController();