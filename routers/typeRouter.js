const { Router } = require("express");
const typeController = require("../controllers/typeController");
const typeRouter = new Router();

typeRouter.post('/', typeController.create);
typeRouter.get('/', typeController.getAll);
typeRouter.delete('/', typeController.delete);


module.exports = typeRouter;