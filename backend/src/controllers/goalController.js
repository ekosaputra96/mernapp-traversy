const mongoose = require("mongoose");

const {
    ValidationError,
    AuthenticationError,
} = require("../utils/CustomError");
const Goal = require("../models/goalModel");
const { successWrapper } = require("../utils/responseWrapper");

/*
    @desc    get all goals
    @route   GET /api/v1/goals
    @access  private
*/
async function getGoals(req, res, next) {
    try {
        const goals = await Goal.find({ userId: req.user.id });
        return successWrapper(res, goals, "Get all goals");
    } catch (error) {
        next(error);
    }
}

/*
    @desc    get specific goal
    @route   GET /api/v1/goals/:id
    @access  private
*/
async function getGoal(req, res, next) {
    const { id } = req.params;
    if (!id) return next(new ValidationError("Missing goal id !"));

    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new ValidationError("Not a valid goal id !"));

    try {
        const goal = await Goal.findById(id);
        if (!goal) throw new ValidationError("Goal not found !");

        // make sure the goal belongs to the current user
        if (req.user.id !== goal.userId.toString())
            throw new AuthenticationError("Not authorized user");

        return successWrapper(res, goal, "Get a specific goal");
    } catch (error) {
        next(error);
    }
}

/*
    @desc    store a goal
    @route   POST /api/v1/goals
    @access  private
*/
async function storeGoal(req, res, next) {
    const { text } = req.body;
    if (!text) return next(new ValidationError("Missing credentials !"));

    try {
        const goal = await Goal.create({
            userId: req.user.id,
            text,
        });
        return successWrapper(res, goal, "Created a goal successfully", 201);
    } catch (error) {
        next(error);
    }
}

/*
    @desc    update a goal
    @route   PUT /api/v1/goals/:id
    @access  private
*/
async function updateGoal(req, res, next) {
    const { id } = req.params;
    if (!id) return next(new ValidationError("Missing goal id !"));

    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new ValidationError("Not a valid goal id !"));

    const { text } = req.body;
    if (!text) return next(new ValidationError("Missing credentials !"));

    try {
        let goal = await Goal.findById(id);
        if (!goal) throw new ValidationError("Goal not found!");
        // make sure the goal belongs to the current user
        if (req.user.id !== goal.userId.toString())
            throw new AuthenticationError("Not authorized user");

        // updating the goals
        goal = await Goal.findByIdAndUpdate(id, { text }, { new: true });
        return successWrapper(res, goal, "Updated a goal successfully", 200);
    } catch (error) {
        next(error);
    }
}

/*
    @desc    delete a goal
    @route   DELETE /api/v1/goals
    @access  private
*/
async function deleteGoal(req, res, next) {
    const { id } = req.params;
    if (!id) return next(new ValidationError("Missing goal id !"));

    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new ValidationError("Not a valid goal id !"));

    try {
        let goal = await Goal.findById(id);
        if (!goal) throw new ValidationError("Goal not found!");
        // make sure the goal belongs to the current user
        if (req.user.id !== goal.userId.toString())
            throw new AuthenticationError("Not authorized user");

        goal = await Goal.findByIdAndDelete(id);

        return successWrapper(res, goal, "Deleted a goal successfully", 200);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getGoals,
    getGoal,
    storeGoal,
    updateGoal,
    deleteGoal,
};
