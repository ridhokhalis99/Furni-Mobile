const router = require("express").Router();
const Controller = require("../controllers");

router.get("/", Controller.readAllUsers);
router.post("/", Controller.createUser);
router.get("/:_id", Controller.readUserById);
router.delete("/:_id", Controller.deleteUser);

module.exports = router;
