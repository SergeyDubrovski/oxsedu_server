const { Router } = require("express");
const typeController = require("../controllers/typeController");
const checkRoleMiddleware = require("../middleware/CheckRoleMiddleware");
const typeRouter = new Router();

typeRouter.post('/', checkRoleMiddleware(), typeController.create);
typeRouter.get('/', typeController.getAll);
typeRouter.delete('/', typeController.delete);


module.exports = typeRouter;