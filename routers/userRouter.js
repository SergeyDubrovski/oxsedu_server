const { Router } = require("express");
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middleware/AuthMiddleware.js");
const userRouter = new Router();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/auth', authMiddleware, userController.checkAuth);

module.exports = userRouter;