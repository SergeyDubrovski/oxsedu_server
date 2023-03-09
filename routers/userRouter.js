const { Router } = require("express");
const userController = require("../controllers/userController.js");
const userRouter = new Router();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/auth',userController.checkAuth);

module.exports = userRouter;