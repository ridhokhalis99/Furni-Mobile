const router = require("express").Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.readAllUsers);
router.post("/", UserController.createUser);
router.get("/:_id", UserController.readUserById);
router.delete("/:_id", UserController.deleteUser);

module.exports = router;
