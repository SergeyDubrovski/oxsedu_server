const { Router } = require("express");
const deviceRouter = new Router();

deviceRouter.post('/');
deviceRouter.get('/');
deviceRouter.get('/:id');
deviceRouter.delete('/');


module.exports = deviceRouter;