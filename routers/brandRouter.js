const { Router } = require("express");
const brandController = require("../controllers/brandController");
const checkRoleMiddleware = require("../middleware/CheckRoleMiddleware");
const brandRouter = new Router();

brandRouter.post('/', checkRoleMiddleware("ADMIN"), brandController.create );
brandRouter.get('/', brandController.getAll);
brandRouter.delete('/', brandController.delete);


module.exports = brandRouter;