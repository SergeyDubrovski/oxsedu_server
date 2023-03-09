const { Router } = require("express");
const deviceController = require("../controllers/deviceController");
const deviceRouter = new Router();

deviceRouter.post('/', deviceController.create);
deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/:id', deviceController.getOne);
deviceRouter.delete('/', deviceController.delete);


module.exports = deviceRouter;