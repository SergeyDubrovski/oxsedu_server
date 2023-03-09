const { Router } = require("express");
const brandRouter = require("./BrandRouter");
const deviceRouter = require("./deviceRouter");
const typeRouter = require("./typeRouter");
const userRouter = require("./userRouter");
const router = new Router();

router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);

module.exports = router;
