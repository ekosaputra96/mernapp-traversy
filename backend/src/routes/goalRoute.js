const router = require("express").Router();
const goalController = require("../controllers/goalController");

router.route("/").get(goalController.getGoals).post(goalController.storeGoal);
router.route("/:id").get(goalController.getGoal).put(goalController.updateGoal).delete(goalController.deleteGoal);

module.exports = router;
