const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please select a user"],
        },
        text: {
            type: String,
            required: [true, "Please enter a text"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Goal", goalSchema);
