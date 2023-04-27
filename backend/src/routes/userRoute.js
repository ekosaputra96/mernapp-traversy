const router = require("express").Router();
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

router.post("/", userController.register);
router.post("/login", userController.login);
router.get("/me", authenticate,userController.getMe)

module.exports = router;