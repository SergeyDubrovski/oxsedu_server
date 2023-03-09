const { Router } = require("express");
const brandController = require("../controllers/brandController");
const brandRouter = new Router();

brandRouter.post('/', brandController.create );
brandRouter.get('/', brandController.getAll);
brandRouter.delete('/', brandController.delete);


module.exports = brandRouter;