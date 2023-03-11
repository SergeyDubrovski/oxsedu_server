const jwt = require('jsonwebtoken')
// middleware проверка токена
const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {              // если тип ошибки соответствует заданному классу
       next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];// Получение токена из header
        if (!token) {
            return res.status(401).json({message: 'Пользователь не авторизован'});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Пользователь не авторизован'});
    }
}
module.exports = authMiddleware;

