const router = require("express").Router();
const userRouter = require("./userRouter");
const appRouter = require("./appRouter");
const errorHandler = require("../middlewares/errorHandler");

router.use("/", appRouter);
router.use("/users", userRouter);
router.use(errorHandler);

module.exports = router;
